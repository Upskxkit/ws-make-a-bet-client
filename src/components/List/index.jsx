import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { AutoSizer, List } from "react-virtualized";
import styles from "./style.module.scss";

const ProductsList = ({ list, config, onBet = () => {}, isBet = false }) => {
  function rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) {
    const product = list[index];
    return (
      <div className={styles.row} key={key} style={style}>
        <div className={styles.letter}>{product.title.charAt(0)}</div>
        <div className={`${styles.name} ${styles.w100}`}>{product.title}</div>
        <div className={styles.w100}>Price {product.currentBid}</div>
        <div className={styles.w100}>{product.daysLeft} days left</div>
        <div className="f-g-1">{product.description}</div>

        <div>
          {isBet && (
            <IconButton
              onClick={() => {
                onBet(product);
              }}
            >
              <ExpandLessIcon />
            </IconButton>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: "1 0 auto", height: "100%", width: "100%" }}>
      <AutoSizer>
        {({ width, height }) => {
          return (
            <List
              ref="List"
              height={height}
              overscanRowCount={config.overscanRowCount}
              noRowsRenderer={_noRowsRenderer}
              rowCount={config.rowCount}
              rowHeight={config.rowHeight}
              rowRenderer={rowRenderer}
              width={width}
            />
          );
        }}
      </AutoSizer>
    </div>
  );
};

export default ProductsList;

function _noRowsRenderer() {
  return <div>No rows</div>;
}