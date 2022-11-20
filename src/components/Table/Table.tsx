import { ReactNode, PureComponent } from "react";
import clsx from "clsx";
import { Theme, styled } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import { deleteRow } from "../../reducers/tableSlice";
import { useDispatch } from "react-redux";
import {
  AutoSizer,
  Column,
  Table,
  TableCellRenderer,
  TableHeaderProps,
} from "react-virtualized";

import { Row, MuiVirtualizedTableProps } from "./types";

import { deleteItemRequest } from "../../hooks/requests";

const classes = {
  flexContainer: "ReactVirtualizedDemo-flexContainer",
  tableRow: "ReactVirtualizedDemo-tableRow",
  tableRowHover: "ReactVirtualizedDemo-tableRowHover",
  tableCell: "ReactVirtualizedDemo-tableCell",
  noClick: "ReactVirtualizedDemo-noClick",
};

const styles = ({ theme }: { theme: Theme }) =>
  ({
    "& .ReactVirtualized__Table__headerRow": {
      ...(theme.direction === "rtl" && {
        paddingLeft: "0 !important",
      }),
      ...(theme.direction !== "rtl" && {
        paddingRight: undefined,
      }),
    },
    [`& .${classes.flexContainer}`]: {
      display: "flex",
      alignItems: "center",
      boxSizing: "border-box",
    },
    [`& .${classes.tableRow}`]: {
      cursor: "pointer",
    },
    [`& .${classes.tableRowHover}`]: {
      "&:hover": {
        backgroundColor: theme.palette.grey[200],
      },
    },
    [`& .${classes.tableCell}`]: {
      flex: 1,
    },
    [`& .${classes.noClick}`]: {
      cursor: "initial",
    },
  } as const);

class MuiVirtualizedTable extends PureComponent<MuiVirtualizedTableProps> {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };

  getRowClassName = ({ index }: Row) => {
    const { onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer: TableCellRenderer = ({ cellData, columnIndex }) => {
    const { columns, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? "right"
            : "left"
        }
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({
    label,
    columnIndex,
  }: TableHeaderProps & { columnIndex: number }) => {
    const { headerHeight, columns } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick
        )}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? "right" : "left"}
      >
        {<span>{label as ReactNode}</span>}
      </TableCell>
    );
  };

  render() {
    const { columns, rowHeight, headerHeight, ...tableProps } = this.props;
    return (
      // @ts-ignore
      <AutoSizer>
        {({ height, width }) => (
          // @ts-ignore
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight!}
            gridStyle={{
              direction: "inherit",
            }}
            headerHeight={headerHeight!}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                // @ts-ignore
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

const VirtualizedTable = styled(MuiVirtualizedTable)(styles);

// ---

export default function ReactVirtualizedTable({ rows }: any) {
  const dispatch = useDispatch();
  return (
    <Paper
      style={{
        height: "fit-content",
        minHeight: "50%",
        maxHeight: "80%",
        width: "100%",
      }}
    >
      <VirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={[
          // @ts-ignore
          {
            width: 200,
            label: "Name",
            dataKey: "name",
          },
          // @ts-ignore
          {
            width: 120,
            label: "Calories\u00A0(g)",
            dataKey: "calories",
            numeric: true,
          },
          // @ts-ignore
          {
            width: 120,
            label: "Fat\u00A0(g)",
            dataKey: "fat",
            numeric: true,
          },
          // @ts-ignore
          {
            width: 120,
            label: "Carbs\u00A0(g)",
            dataKey: "carbs",
            numeric: true,
          },
          // @ts-ignore
          {
            width: 120,
            label: "Protein\u00A0(g)",
            dataKey: "protein",
            numeric: true,
          },
          // @ts-ignore
          {
            width: 100,
            dataKey: "DeleteForeverIcon",
            // @ts-ignore
            cellRenderer: ({ rowIndex }) => (
              <IconButton
                onClick={() => {
                  let id = rows.at(rowIndex).id;
                  deleteItemRequest(id);
                  dispatch(deleteRow(id));
                }}
              >
                <DeleteForeverIcon />
              </IconButton>
            ),
          },
        ]}
      />
    </Paper>
  );
}
