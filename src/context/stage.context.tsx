import React, { createContext, ReactNode, useContext } from "react";

/******************************************************************************
    INTERFACES
*******************************************************************************/
interface IStageContext {
    isDevMode: boolean;
}

/******************************************************************************
    INITIALISE CONTEXT
*******************************************************************************/
const StageContext = createContext<IStageContext>({
    isDevMode: false,
});

/******************************************************************************
    PROVIDER
*******************************************************************************/
const StageProvider = ({ children }: { children: ReactNode }) => {
    const isDevMode =
        Boolean(process.env.NEXT_IS_DEV_MODE) === undefined ? false : true;

    console.log("isDevMode", isDevMode);

    return (
        <StageContext.Provider value={{ isDevMode }}>
            {children}
        </StageContext.Provider>
    );
};

/******************************************************************************
    CONTEXT HOOK
*******************************************************************************/
const useStageContext = (): IStageContext => {
    const context = useContext(StageContext);
    if (!context)
        throw new Error("useStageContext must be used within a StageProvider");
    return context;
};

export { StageProvider, useStageContext };
