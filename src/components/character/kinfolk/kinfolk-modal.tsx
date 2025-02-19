'use client';

import {Box, Button, Card, CardContent, CardHeader, Modal, useTheme} from "@mui/material";
import {useMemo, useState} from "react";
import {
  DataGrid,
  gridClasses,
  GridColDef,
  GridRowSelectionModel,
  GridToolbar
} from "@mui/x-data-grid";
import {tags} from "@/data/v1/tags";
import {alpha} from "@mui/material/styles";
import {darken, lighten} from "@mui/system/colorManipulator/colorManipulator";
import {ETagCategories} from "@/data/types";
import {useCharacterContext} from "@/context/character/character-context";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const columns: GridColDef<(typeof tags)[number]>[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 80,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 600,
  },
  {
    field: 'categories',
    headerName: 'Categories',
    width: 150,
  },
];

export function KinfolkModal() {
  const characterData = useCharacterContext();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = useTheme();
  const darkMode = theme.palette.mode === 'dark';

  const kinfolkTags = useMemo(() => (
    tags.filter(t => t.categories.indexOf(ETagCategories.KINFOLK) >= 0)
  ), []);

  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>(
    kinfolkTags.map((kt, i) => {
      const abilities = (characterData.character?.kinfolk.tags ?? []);
      return abilities
        .map(a => a.id)
        .indexOf(kt.id) >= 0
          ? i : null
    })
    .filter(v => v !== undefined && v !== null));

  const setSelectedAbilities = (ids: number[])=> {
    setRowSelectionModel(ids);
    characterData.updateAllKinfolkAbilities(ids);
  };

  const isRowSelectable = (rowId: number | string) => {
    const id = typeof rowId === 'string' ? parseInt(rowId, 10) : rowId;

    return rowSelectionModel.length < 3 || rowSelectionModel.indexOf(id) >= 0;
  }

  const trySetRowSelection = (value: GridRowSelectionModel) => {
    if (rowSelectionModel.length < 3 || rowSelectionModel.filter(r => value.indexOf(r) >= 0).length < 3) {
      setSelectedAbilities(value.map(v => typeof v === 'string' ? parseInt(v, 10) : v));
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpen}
      >
        Select
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Card sx={{width: "1200px", maxWidth: "80vw", ...style}}>
          <CardHeader
            title="Select Kinfolk abilities"
            sx={{pb: 0}}
          />
          <CardContent>
            <Box
              display="flex"
              flexDirection="column"
              sx={{minHeight: "420px", maxHeight: "80vh"}}
            >
              <DataGrid
                rows={kinfolkTags}
                columns={columns}
                rowHeight={38}
                columnHeaderHeight={42}
                getRowClassName={params => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd' }
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 12,
                    },
                  },
                }}
                pageSizeOptions={[
                  {value: 12, label: "12"},
                  {value: 24, label: "24"},
                  {value: 48, label: "48"}
                ]}
                checkboxSelection
                disableRowSelectionOnClick
                rowSelectionModel={rowSelectionModel}
                onRowSelectionModelChange={(p) => trySetRowSelection(p)}
                isRowSelectable={p => isRowSelectable(p.id)}
                slots={{
                  toolbar: GridToolbar,
                }}
                slotProps={{
                  toolbar: {
                    showQuickFilter: true,
                  },
                }}
                sx={{
                  ['& .MuiDataGrid-topContainer']: {
                    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                  },
                  ['& .MuiDataGrid-row:hover']: {
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.2),
                    },
                  },
                  [`& .${gridClasses.row}.even`]: {
                    backgroundColor: darkMode ? lighten(theme.palette.background.default, 0.1) : darken(theme.palette.background.default, 0.1),
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
}

