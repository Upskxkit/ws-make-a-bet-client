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
    socket.on(Channels.Products, dispatch);

    socket.emit(Channels.Products, { method: ProductRPC.List });

    return () => {
      socket.removeListner(Channels.Products, dispatch);
    };
    //TODO useRef for listner
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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          <Tab icon={<PersonIcon />} label="ТОВАРЫ" />
          {user && <Tab icon={<LocalMallIcon />} label="МОИ ТОВАРЫ" />}
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

      if ("error" in action.args) {
        console.error(action.args);
        return state;
      }

      const newProduct = action.args;

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

      if ("error" in action.args) {
        console.error(action.args);
        return state;
      }

      const updatedProduct = action.args;

      products = products.map((item) => {
        if (item.id !== updatedProduct.id) {
          return item;
        }

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
