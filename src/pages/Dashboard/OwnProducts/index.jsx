import Button from "@material-ui/core/Button";
import React, { memo, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
import ProductsList from "../../../components/List";
import { OwnProductsWrapper } from "./styled";

const OwnProducts = ({ list = [] }) => {
  const { user } = useUser();
  const [ownList, setOwnList] = useState([]);
  const [config, setConfig] = useState({
    rowHeight: 50,
    rowCount: ownList.length,
    overscanRowCount: 10,
    showScrollingPlaceholder: false,
    useDynamicRowHeight: false,
  });

  useEffect(() => {
    setOwnList(list.filter((item) => item.seller === user.id));
  }, [list]);

  useEffect(() => {
    setConfig((prev) => ({
      ...prev,
      rowCount: ownList.length,
    }));
  }, [ownList]);

  return (
    <>
      <OwnProductsWrapper>
        <Button
          color="primary"
          variant="outlined"
          component={RouterLink}
          to={"/product"}
        >
          Create
        </Button>
      </OwnProductsWrapper>
      <ProductsList config={config} list={ownList} />
    </>
  );
};

export default memo(OwnProducts);
