/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

import * as Icon from "./icons";

interface TableRowProps {
  blockId: string;
}

export const TableRow: React.FC<TableRowProps> = ({ blockId }) => {
  return (
    <div
      data-block-id={blockId}
      key="notion-selectable notion-page-block notion-collection-item"
      className="h-[calc(100% + 2px)] flex"
    >
      <div
        key="notion-table-view-row"
        dir="ltr"
        className="border-bottom: 1px solid rgb(233, 233, 231); flex w-full"
      >
        <div className="flex">
          <div className="left-[calc(32px + -1 * var(--sticky-horizontal-offset, 0px))] sticky z-[850] flex">
            <div className="left-[-]2px; absolute">
              <div className="border-bottom: rgb(233, 233, 231); opacity: 0; transition-property: opacity; transition-duration: 200ms; transition-delay: 0ms; transition-timing-function: ease; h-full">
                <div className="h-full">
                  <label className="align-items: flex-start; justify-content: center; cursor: pointer; opacity: 0; transition-property: opacity; transition-duration: 200ms; transition-delay: 0ms; transition-timing-function: ease; z-[10] flex h-full">
                    <div className="justify-content: center; align-items: center; flex h-[31px] w-[32px]">
                      <input
                        type="checkbox"
                        className="cursor: pointer; accent-color: rgb(35, 131, 226); right: 2px; relative h-[14px] w-[14px]"
                      />
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div
            key="notion-table-view-cell"
            data-row-index="0"
            data-col-index="0"
            className="border-right: 1px solid rgb(233, 233, 231); relative flex h-full w-[216px]"
          >
            <div className="overflow-x: clip; flex h-full w-[216px]">
              <div
                role="button"
                tabIndex={0}
                data-testid="property-value"
                className="transition: background 20ms ease-in; cursor: pointer; display: block; font-size: 14px; overflow: clip; white-space: normal; padding: 5px 8px; relative min-h-[32px] w-full select-none"
              >
                <span className="line-h-[1]5; white-space: pre-wrap; word-break: break-word; display: inline; font-weight: 500; background-image: linear-gradient(to right, rgba(55, 53, 47, 0.16) 0%, rgba(55, 53, 47, 0.16) 100%); background-repeat: repeat-x; background-position: 0px 100%; background-size: 100% 1px; margin-right: 5px;">
                  page
                </span>
              </div>
            </div>

            <div className="background: rgba(35, 131, 226, 0.07); border-radius: 3px; box-shadow: rgba(35, 131, 226, 0.57) 0px 0px 0px 2px inset, rgba(35, 131, 226, 0.35) 0px 0px 0px 1px inset; pointer-events: none; absolute left-0 top-0 z-[840] h-full w-full"></div>
          </div>

          <div
            key="notion-table-view-cell"
            data-row-index="0"
            data-col-index="1"
            className="border-right: 1px solid rgb(233, 233, 231); relative flex h-full w-[100px]"
          >
            <div className="overflow-x: clip; flex h-full w-[100px]">
              <div
                role="button"
                tabIndex={0}
                data-testid="property-value"
                className="transition: background 20ms ease-in; cursor: pointer; display: block; font-size: 14px; overflow: clip; white-space: normal; padding: 5px 8px; relative min-h-[32px] w-full select-none"
              >
                <div className="line-h-[1]5; white-space: pre-wrap; word-break: break-word;">
                  <span>aerfaerf</span>
                </div>
              </div>
            </div>
          </div>

          <div
            key="notion-table-view-cell"
            data-row-index="0"
            data-col-index="2"
            className="border-right: 1px solid rgb(233, 233, 231); relative flex h-full w-[90px]"
          >
            <div className="overflow-x: clip; flex h-full w-[90px]">
              <div
                role="button"
                tabIndex={0}
                data-testid="property-value"
                className="transition: background 20ms ease-in; cursor: pointer; display: block; font-size: 14px; overflow: clip; white-space: normal; padding: 8px; relative min-h-[32px] w-full select-none"
              >
                <div className="max-w-full">
                  <div
                    key="pseudoHover pseudoActive"
                    className="flex-shrink: 0; flex-grow: 0; align-items: center; justify-content: center; transition-background border-radius: 3px; --pseudoHover--background: rgba(55,53,47,.06); --pseudoActive--background: rgba(55,53,47,.16); relative flex h-[16px] w-[16px]"
                  >
                    <div aria-hidden="true">
                      <Icon.RoundedSquareCheckbox />
                    </div>
                    <input
                      type="checkbox"
                      className="opacity: 0; cursor: pointer; absolute left-0 top-0 h-[16px] w-[16px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-bottom: 1px solid rgb(233, 233, 231); justify-content: flex-start; flex-grow: 1; flex w-[64px]"></div>
    </div>
  );
};
