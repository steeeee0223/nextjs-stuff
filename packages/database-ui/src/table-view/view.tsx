import { paddingX } from "../database/constant";
import * as Icon from "./icons";
import { TableHeaderRow } from "./table-header-row";
import { TableRow } from "./table-row";
import type { Column } from "./types";

export const TableView = () => {
  // colId
  const cols: Record<number, Column> = {
    [0]: {
      colId: 0,
      type: "title",
      title: "Name",
      icon: (
        <Icon.TypesTitle className="block size-4 shrink-0 fill-primary/45" />
      ),
      width: "216px",
    },
    [1]: {
      colId: 1,
      type: "text",
      title: "Desc.",
      icon: (
        <Icon.TypesText className="block size-4 shrink-0 fill-primary/45" />
      ),
      width: "100px",
    },
    [2]: {
      colId: 2,
      type: "checkbox",
      title: "Done",
      icon: (
        <Icon.TypesCheckbox className="block size-4 shrink-0 fill-primary/45" />
      ),
      width: "90px",
    },
  };

  return (
    <div
      key="notion-table-view"
      // No need: pl-[96px] pr-[96px]
      className="relative float-left min-w-full select-none pb-0 lining-nums tabular-nums"
      style={{paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px`}}
    >
      <div className="absolute z-[9990] w-full" />
      <div className="pointer-events-none mt-0 h-0" />
      <div
        data-block-id="15f35e0f-492c-8003-9976-f8ae747a6aeb"
        // key="notion-selectable notion-collection_view-block"
        className="relative"
      >
        {/* Header row */}
        <div className="h-[34px]">
          <div className="overflow-x: initial; w-full">
            <div className="w-[initial]">
              <div
                data-portal-container="e86cab6b-5fb8-4573-856b-6a12d191ce8c"
                data-is-sticky="false"
                data-sticky-attach-point="ceiling"
              >
                <div className="relative">
                  <TableHeaderRow cols={Object.values(cols)} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative isolation-auto min-w-[708px]">
          {/* Drag and Fill handle */}
          <div
            key="notion-table-view-drag-and-fill-handle"
            className="relative z-[850] flex"
          >
            <div className="flex w-[calc(100%-64px)]">
              <div className="left-[32px]">
                <div className="absolute left-[210px]">
                  <div className="pointer-events-auto absolute left-0 top-[26px] h-[15px] w-[10px] cursor-ns-resize" />

                  <div className="absolute left-0 top-7 size-[9px] transform cursor-ns-resize rounded-full border-2 border-blue/60 bg-white duration-200" />
                </div>
              </div>
            </div>
          </div>
          {/* Header bottom border */}
          <div>
            <div
              data-block-id="15f35e0f-492c-8003-9976-f8ae747a6aeb"
              // key="notion-selectable notion-collection_view-block"
              // I impl. this
              className="flex w-full border-b border-b-border-cell"
            />
          </div>

          {/* Row 1 */}
          <TableRow
            blockId="15f35e0f-492c-804c-9534-d615e3925074"
            rowId={0}
            data={[
              { type: "title" as const, value: "page" },
              { type: "text" as const, value: "description..............." },
              { type: "checkbox" as const },
            ].map((data, colId) => ({
              ...data,
              colId,
              width: cols[colId]?.width,
            }))}
          />
          {/* Row 2 */}
          <TableRow
            blockId="15f35e0f-492c-809e-b647-f72038f14c5f"
            rowId={1}
            data={[
              { type: "title" as const, value: "page 2" },
              { type: "text" as const, value: "desc2" },
              { type: "checkbox" as const },
            ].map((data, colId) => ({
              ...data,
              colId,
              width: cols[colId]?.width,
            }))}
          />
        </div>
        <div className="w-[438px]" />
        <div
          role="button"
          tabIndex={0}
          key="notion-table-view-add-row"
          className="transition-background-in flex h-[33px] w-full cursor-pointer select-none items-center bg-white pl-2 leading-5"
        >
          <span className="sticky left-10 inline-flex items-center text-sm text-muted opacity-100 transition-opacity duration-200 dark:text-muted-dark">
            <Icon.Plus className="ml-[1px] mr-[7px] block size-[14px] shrink-0 fill-primary/35" />
            New page
          </span>
        </div>
        <div
          contentEditable="false"
          key="pseudoSelection"
          data-content-editable-void="true"
          className="--pseudoSelection--background: transparent; clip-path: polygon(0% -20%, 100% -20%, 100% 100%, 0% 100%); box-sizing: border-box; left-0 z-[850] flex h-[32px] min-w-full select-none border-t border-t-border-cell bg-white text-sm"
        >
          <div className="flex pr-[32px]">
            <div className="flex">
              <div className="left-[calc(32px + -1 * var(--sticky-horizontal-offset, 0px))] sticky z-[830] flex bg-white" />
              <div className="flex w-[216px]">
                <div
                  role="button"
                  tabIndex={0}
                  className="transition: background 0.2s; flex h-8 w-full cursor-pointer select-auto items-center justify-end overflow-hidden whitespace-nowrap pr-2"
                ></div>
              </div>
              <div className="flex w-[100px]">
                <div
                  role="button"
                  tabIndex={0}
                  className="transition: background 0.2s; flex h-8 w-full cursor-pointer select-auto items-center justify-end overflow-hidden whitespace-nowrap pr-2"
                ></div>
              </div>
              <div className="flex w-[90px]">
                <div
                  role="button"
                  tabIndex={0}
                  className="transition: background 0.2s; flex h-8 w-full cursor-pointer select-auto items-center justify-end overflow-hidden whitespace-nowrap pr-2"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events: none; clear: both; transform: translateY(0px); mt-0 h-0"></div>
      <div className="transform: translateY(-34px); absolute z-[9990] w-full"></div>
    </div>
  );
};
