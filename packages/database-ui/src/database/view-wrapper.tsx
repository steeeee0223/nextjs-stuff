import React from "react"
import {paddingX} from "./constant"

export const ViewWrapper: React.FC<React.PropsWithChildren> = ({children}) => {
    return <div
    contentEditable={false}
    data-content-editable-void
    className="grow shrink-0 flex flex-col relative max-h-inherit w-screen" style={{left: `-${paddingX}px`}}>
        <div className="relative">
        <div className="z-10 grow shrink-0 h-full overflow-y-hidden overflow-x-auto mr-0 mb-0">
        {children}
        </div>
        </div>
    </div>
}