/* eslint-disable jsx-a11y/label-has-associated-control */
import "./view.css";

import * as Icon from "./icons";
import { ActionCell, TableHeaderCell } from "./table-header-cells";

export const TableHeaderRow = () => {
  return (
    <div
      // key="notion-table-view-header-row"
      dir="ltr"
      className="box-shadow: white -3px 0px 0px, rgb(233, 233, 231) 0px -1px 0px inset; relative left-0 right-0 z-[870] box-border flex h-[34px] min-w-[708px] bg-white text-primary/65"
    >
      <div className="left: calc(32px + -1 * var(--sticky-horizontal-offset, 0px)); sticky z-[830] flex">
        <div className="absolute -left-8">
          <div className="h-full border-b-[#E9E9E7] opacity-0">
            <div className="h-full">
              <label className="z-10 flex h-full cursor-pointer items-start justify-center opacity-0">
                <div className="flex h-[31px] w-8 items-center justify-center">
                  <input
                    type="checkbox"
                    className="relative right-0.5 size-[14px] cursor-pointer accent-blue"
                  />
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="m-0 inline-flex">
        <TableHeaderCell
          type="title"
          title="Name"
          icon={<Icon.TypesTitle />}
          width="216px"
        />
        <TableHeaderCell
          type="text"
          title="desc"
          icon={<Icon.TypesText />}
          width="100px"
        />
        <TableHeaderCell
          type="checkbox"
          title="Done"
          icon={<Icon.TypesCheckbox />}
          width="90px"
        />
      </div>

      <ActionCell icon={<Icon.Plus />} />
      <ActionCell icon={<Icon.Dots />} className="grow" />
    </div>
  );
};
