import ReactVirtualizedTable from "../components/Table/Table";
import { MainForm } from "../components/Form/Form";
import Button from "@mui/material/Button";
import { Transition } from "react-transition-group";
import { useRef } from "react";
import { handleIsOpenForm } from "../reducers/tableSlice";
import { Data } from "../components/Table/types";
import {
  defaultStyleWrapper,
  transitionStylesWrapper,
  defaultStylePopup,
  transitionStylesPopop,
} from "./animationParams";
import { setRows } from "../reducers/tableSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { globalText } from "../textData";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const MainLayout = () => {
  const theme = createTheme({
    palette: {
      primary: {
        light: "#FFB05B",
        main: "#FC7F2B",
        dark: "#C35000",
        contrastText: "#fff",
      },
    },
  });
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(setRows());
  }, []);

  const rows: Data = useSelector(({ table }: any) => table.rows);
  const isOpenForm = useSelector(({ table }: any) => table.isOpenForm);

  const TableWrapperRef = useRef(null);
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{ display: isOpenForm ? "block" : "none" }}
        onClick={() => dispatch(handleIsOpenForm())}
        className="form-open-filter"
      ></div>
      <Transition timeout={0} in={isOpenForm}>
        {(state) => (
          <div
            className="popup"
            style={{
              ...defaultStylePopup,
              // @ts-ignore
              ...transitionStylesPopop[state],
            }}
          >
            <MainForm />
          </div>
        )}
      </Transition>
      <Transition timeout={50} in={isOpenForm}>
        {(state) => (
          <>
            <div
              className="table-wrapper"
              ref={TableWrapperRef}
              style={{
                ...defaultStyleWrapper,
                // @ts-ignore
                ...transitionStylesWrapper[state],
              }}
            >
              <div className="open-form-button">
                <Button
                  sx={{ borderRadius: 5 }}
                  onClick={() => dispatch(handleIsOpenForm())}
                  variant="contained"
                >
                  {globalText.create}
                </Button>
              </div>
              <div className="table-layout-wrapper">
                <ReactVirtualizedTable rows={rows} />
              </div>
            </div>
          </>
        )}
      </Transition>
    </ThemeProvider>
  );
};
export default MainLayout;
