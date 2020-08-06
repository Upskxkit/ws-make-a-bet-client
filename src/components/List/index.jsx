import IconButton from "@material-ui/core/IconButton";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import React from "react";
import { AutoSizer, List } from "react-virtualized";
import styles from "./style.module.scss";

export default function ProductsList({
  list,
  config,
  onBet = () => {},
  isBet = false,
}) {
  return (
    <div style={{ flex: "1 0 auto", height: "100%", width: "100%" }}>
      <AutoSizer>
        {({ width, height }) => (
          <List ref="List" width={width} height={height} />
        )}
      </AutoSizer>
    </div>
  );

  function rowRenderer({ key, index, style }) {
    const product = list[index];

    return <div className={styles.row} key={key} style={style}></div>;
  }
}

function noRowsRenderer() {
  return <div className={styles.noRows}>No rows</div>;
}

//  <div className={styles.letter}>{product.title.charAt(0)}</div>
//         <div className={styles.w100}>{product.title}</div>
//         <div className={styles.w100}>Price {product.currentBid}</div>
//         <div className={styles.w100}>{product.daysLeft} days left</div>
//         <div className="f-g-1">{product.description}</div>
//
//         <div>
//           {isBet && (
//             <IconButton
//               onClick={() => {
//                 onBet(product);
//               }}
//             >
//               <ExpandLessIcon />
//             </IconButton>
//           )}
//         </div>
