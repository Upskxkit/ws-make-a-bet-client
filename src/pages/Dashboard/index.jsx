import React, { useEffect, useReducer, useState } from "react";
import { MainWrapper, PaperStyled } from "./styled";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import PersonIcon from "@material-ui/icons/Person";
import { Tab, Tabs, useMediaQuery } from "@material-ui/core";
import differenceInDays from "date-fns/differenceInDays";
import { BREAKPOINT, Channels, ProductRPC } from "../../constants";
import { useSocket } from "../../hooks/useSocket";
import Products from "./Products";
import { useUser } from "../../hooks/useUser";
import OwnProducts from "./OwnProducts";
import { toast } from "react-toastify";
const TabsNum = {
  PRODUCTS: 0,
  MY_PRODUCTS: 1,
};

const STICKY_LIMIT = 65;

export const Dashboard = () => {
  const socket = useSocket();
  const { user } = useUser();
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINT})`);
  const [isSticky, setIsSticky] = useState(isMobile);
  const [value, setValue] = useState(TabsNum.PRODUCTS);
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    pending: true,
  });

  useEffect(() => {
    if (!user) {
      setValue(TabsNum.PRODUCTS);
    }
  }, [user]);

  useEffect(() => {
    socket.on(Channels.Products, dispatch);

    socket.emit(Channels.Products, { method: ProductRPC.List });

    return () => {
      socket.off(Channels.Products, dispatch);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > STICKY_LIMIT) {
      setIsSticky(true);
    } else if (window.scrollY < STICKY_LIMIT) {
      setIsSticky(false);
    }
  };

  const handleChange = (_event, newValue) => {
    setValue(newValue);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <MainWrapper>
      <PaperStyled square isSticky={isSticky} style={{ maxWidth: BREAKPOINT }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab icon={<PersonIcon />} label="Products" />
          {user && <Tab icon={<LocalMallIcon />} label="My Products" />}
        </Tabs>
      </PaperStyled>
      {value === TabsNum.PRODUCTS && (
        <>{state.pending ? <>pending</> : <Products list={state.products} />}</>
      )}

      {value === TabsNum.MY_PRODUCTS && (
        <>
          {state.pending ? <>pending</> : <OwnProducts list={state.products} />}
        </>
      )}
    </MainWrapper>
  );
};

function reducer(state, action) {
  if (action.args.error) {
    toast.error(action.args.error);
    return state;
  }

  switch (action.method) {
    case ProductRPC.List: {
      let products = [];
      if (Array.isArray(action.args)) {
        products = action.args.map((prod) => ({
          ...prod,
          daysLeft: differenceInDays(new Date(prod.bidEnd), new Date()),
        }));
      }

      return {
        ...state,
        products,
        pending: false,
      };
    }

    case ProductRPC.Create: {
      let products = state.products;
      const newProduct = action.args;

      toast.success(`Product ${newProduct.title} created.`);

      products = [
        ...products,
        {
          ...newProduct,
          daysLeft: differenceInDays(new Date(newProduct.bidEnd), new Date()),
        },
      ];
      return { ...state, products };
    }

    case ProductRPC.Update: {
      let products = state.products;
      const updatedProduct = action.args;

      products = products.map((item) => {
        if (item.id !== updatedProduct.id) {
          return item;
        }

        toast.success(`Product ${updatedProduct.title} updated.`);

        return {
          ...updatedProduct,
          daysLeft: differenceInDays(
            new Date(updatedProduct.bidEnd),
            new Date()
          ),
        };
      });

      return { ...state, products };
    }

    default: {
      return state;
    }
  }
}
