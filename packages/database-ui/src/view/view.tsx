/* eslint-disable jsx-a11y/label-has-associated-control */
import * as Icon from "./icons";
import { TableHeaderRow } from "./table-header-row";

export const View = () => {
  return (
    <div
      key="notion-table-view"
      className="float: left; font-variant-numeric: tabular-nums; relative min-w-full select-none pb-0 pl-[96px] pr-[96px] lining-nums"
    >
      <div className="absolute z-[9990] w-full" />
      <div className="pointer-events-none mt-0 h-0" />
      <div
        data-block-id="15f35e0f-492c-8003-9976-f8ae747a6aeb"
        key="notion-selectable notion-collection_view-block"
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
                  <TableHeaderRow />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="isolation: auto; relative min-w-[708px]">
          <div
            key="notion-table-view-drag-and-fill-handle"
            className="relative z-[850] flex"
          >
            <div className="w-[calc(100% - 64px)] flex">
              <div className="left-[32px]">
                <div className="absolute left-[210px]">
                  <div className="pointer-events: auto; cursor: ns-resize; absolute left-0 top-[26px] h-[15px] w-[10px]"></div>

                  <div className="border: 2px solid rgba(35, 131, 226, 0.57); transition: 0.2s; background: white; border-radius: 50%; cursor: ns-resize; absolute left-0 top-[28px] size-[9px] transform"></div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div
              data-block-id="15f35e0f-492c-8003-9976-f8ae747a6aeb"
              key="notion-selectable notion-collection_view-block"
            ></div>
          </div>

          {/* Row 1 */}
          <div
            data-block-id="15f35e0f-492c-804c-9534-d615e3925074"
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
          {/* Row 2 */}
          <div
            data-block-id="15f35e0f-492c-809e-b647-f72038f14c5f"
            key="notion-selectable notion-page-block notion-collection-item"
            className="h-[calc]100% + 2px); flex"
          >
            <div
              key="notion-table-view-row"
              dir="ltr"
              className="border-bottom: 1px solid rgb(233, 233, 231); flex w-full"
            >
              <div className="flex">
                <div className="left-[calc]32px + -1 * var(--sticky-horizontal-offset, 0px)); sticky z-[850] flex">
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
                  data-row-index="1"
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
                        page2
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  key="notion-table-view-cell"
                  data-row-index="1"
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
                        <span>desc2</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  key="notion-table-view-cell"
                  data-row-index="1"
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
                          className="flex-shrink: 0; flex-grow: 0; align-items: center; justify-content: center; transition-background border-radius: 3px; --pseudoHover--background: rgba(55,53,47,.06); --pseudoActive--background: rgba(55,53,47,.16); background: rgb(35, 131, 226); relative flex h-[16px] w-[16px]"
                        >
                          <div aria-hidden="true">
                            <Icon.RoundedCheck />
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
        </div>
        <div className="w-[438px]"></div>
        <div
          role="button"
          tabIndex={0}
          key="notion-table-view-add-row"
          className="transition: background 20ms ease-in; cursor: pointer; align-items: center; line-h-[20px] background: white; flex h-[33px] w-full select-none pl-[8px]"
        >
          <span className="font-size: 14px; color: rgba(55, 53, 47, 0.5); display: inline-flex; align-items: center; opacity: 1; transition: opacity 0.2s; sticky left-[40px]">
            <Icon.Plus />
            New page
          </span>
        </div>
        <div
          contentEditable="false"
          key="pseudoSelection"
          data-content-editable-void="true"
          className="--pseudoSelection--background: transparent; border-top-[1px]solid rgb(233, 233, 231); background: white; font-size: 14px; clip-path: polygon(0% -20%, 100% -20%, 100% 100%, 0% 100%); box-sizing: border-box; left-0 z-[850] flex h-[32px] min-w-full select-none"
        >
          <div className="flex pr-[32px]">
            <div className="flex">
              <div className="background: white; left-[calc]32px + -1 * var(--sticky-horizontal-offset, 0px)); sticky z-[830] flex"></div>
              <div className="flex w-[216px]">
                <div
                  role="button"
                  tabIndex={0}
                  className="user-select: auto; transition: background 0.2s; cursor: pointer; align-items: center; justify-content: flex-end; overflow: hidden; white-space: nowrap; flex h-[32px] w-full pr-[8px]"
                ></div>
              </div>
              <div className="flex w-[100px]">
                <div
                  role="button"
                  tabIndex={0}
                  className="user-select: auto; transition: background 0.2s; cursor: pointer; align-items: center; justify-content: flex-end; overflow: hidden; white-space: nowrap; flex h-[32px] w-full pr-[8px]"
                ></div>
              </div>
              <div className="flex w-[90px]">
                <div
                  role="button"
                  tabIndex={0}
                  className="user-select: auto; transition: background 0.2s; cursor: pointer; align-items: center; justify-content: flex-end; overflow: hidden; white-space: nowrap; flex h-[32px] w-full pr-[8px]"
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
