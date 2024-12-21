import { createContext, useContext, useState } from "react";

interface UpdateListContextProps {
  updateList: boolean;
  setUpdateList: (value: boolean) => void;
}

const UpdateListContext = createContext<UpdateListContextProps | undefined>(
  undefined
);

export const UpdateListProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [updateList, setUpdateList] = useState<boolean>(true);

  return (
    <UpdateListContext.Provider value={{ updateList, setUpdateList }}>
      {children}
    </UpdateListContext.Provider>
  );
};

export const useUpdateList = () => {
  const context = useContext(UpdateListContext);
  if (!context) {
    throw new Error(
      "useUpdateList debe usarse dentro de un UpdateListProvider"
    );
  }
  return context;
};
