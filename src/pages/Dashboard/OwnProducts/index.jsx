import React, { memo, useEffect, useState } from "react";
import { useUser } from "../../../hooks/useUser";
import ProductsList from "../../../components/List";

const OwnProducts = ({ list }) => {
  const { user } = useUser();
  const [ownList, setOwnList] = useState(
    list.filter((item) => item.seller === user?.id)
  );

  useEffect(() => {
    setOwnList(list.filter((item) => item.seller === user?.id));
  }, [list]);

  useEffect(() => {
    setConfig((prev) => ({
      ...prev,
      rowCount: list.length,
    }));
  }, [ownList]);

  const [config, setConfig] = useState({
    rowHeight: 50,
    rowCount: ownList.length,
    overscanRowCount: 10,
    showScrollingPlaceholder: false,
    useDynamicRowHeight: false,
  });

  return <ProductsList config={config} list={ownList} />;
};

export default memo(OwnProducts);
