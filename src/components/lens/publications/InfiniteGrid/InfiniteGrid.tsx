import React, { memo, forwardRef, useRef } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import {
    Box,
  } from '@chakra-ui/react';
import Post from '../Post/Post';

const GUTTER_SIZE = 14;

const Cell = ({ columnIndex, rowIndex, style, data }: {columnIndex:any, rowIndex:any, style:any, data:any }) => {
    const { cards, columnCount } = data
    const singleColumnIndex = columnIndex + rowIndex * columnCount
    const card = cards[singleColumnIndex]
  
    return (
      <div style={{
        ...style,
        left: style.left + GUTTER_SIZE,
        top: style.top + GUTTER_SIZE,
        width: style.width - GUTTER_SIZE,
        height: style.height - GUTTER_SIZE
      }}>
        {card && (
        <Box
            // key={card.id}
          >
            <Post post={card} />
          </Box>
        )}
      </div>
    )
  }
  
  const innerElementType = forwardRef(({ ...rest }, ref) => (
    <div
      style={{
        paddingLeft: GUTTER_SIZE,
        paddingTop: GUTTER_SIZE,
      }}
      {...rest}
    />
  ));

  
const InfiniteGrid = ({cards} : {cards: any}) => {
    return(
        <div
    
        style={{
          minHeight: "80vh",
          position: "sticky",
          top: "0px",
        }}
      >
        {/* <AutoSizer defaultWidth={1920} defaultHeight={528}> */}
        <AutoSizer>
          {({ width, height }) => {
            let cardWidth;
            // if(deviceType === "mobile") cardWidth = width - 25;
            // if(deviceType === "tablet") cardWidth = width / 4 - 16;
    
    
    
              if (width >= 460) {
                cardWidth = width - 64;
              } 
    
              if (width >= 520) {
                cardWidth = width / 2  - 24;
              } 
    
              if (width >= 800) {
                cardWidth = width / 3 - 24;
              } 
    
              if(width >= 900) {
                cardWidth = width / 3 - 24;
              } 
    
              if(width >= 1100) {
                cardWidth = width / 4 - 24;
              } 
    
    
              if(width >= 1200) {
                cardWidth = width / 5 - 24;
              } 
    
              if(width >= 1680) {
                cardWidth = width / 6 - 24;
              }  else {
                  cardWidth = width 
              }
    
            const cardHeight = 269.4;
            const columnCount = Math.floor(width / cardWidth);
            // const rowCount = Math.ceil(data.length / columnCount);
            const rowCount = 2
            return (
              <div>
              <Grid
                // ref={gridRef}
                className="grid_wrapper"
                width={width}
                height={height}
                columnCount={columnCount}
                columnWidth={cardWidth + GUTTER_SIZE}
                rowCount={rowCount}
                rowHeight={cardHeight + GUTTER_SIZE}
                innerElementType={innerElementType}
                itemData={{ cards, columnCount }}
              >
                {Cell}
              </Grid>
              </div>
            );
          }}
        </AutoSizer>
      </div>
    )
}

export default InfiniteGrid;