import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { useState, useEffect } from 'react';
import { Button, Container, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';


export default function Testd() {

    const [rows, setRows] = useState([])
    const [showDialog, setShowDialog] = useState(false)
    const [add, setAdd] = useState('')
    const [pinnedColumns, setPinnedColumns] = React.useState({
        left: ['name'],
    });

    const handlePinnedColumnsChange = React.useCallback((updatedPinnedColumns) => {
        setPinnedColumns(updatedPinnedColumns);
    }, []);
    const [column, setColumn] = useState([
        { field: 'id', headerName: 'ID', editable: false },
        {
            field: 'title',
            headerName: 'Name',
            width: 300,
            editable: true,
        },
        {
            field: "price",
            headerName: 'Price',
            width: 100,
            editable: false,
            renderCell: (params) => { return params.value < 50 ? <p>PKR {params.value}</p> : <p>USD {params.value}</p> }
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 500,
            sortable: false,
            editable: false,
        },
        {
            field: 'image',
            headerName: 'Image',
            type: 'image',
            sortable: false,
            filterable: false,
            renderCell: (params) => <img src={params.value} alt="Product" style={{ border: '1px solid #ddd', width: '90%', height: '90%', objectFit: 'cover' }} />
        },
    ])

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((response) => response.json())
            .then((data) => setRows(data));
    }, []);

    const newCol = (add) => {
        console.log("add value", add)
        setColumn([...column, {
            field: add,
            headerName: add,
            width: 300,
            editable: true,
        }])
        setShowDialog(false)
    };

    return (
        <div style={{ background: "white", height: "100vh" }}>
            <Container >
                <Dialog open={showDialog}>
                    <DialogContent>
                        <TextField
                            label='Column Name'
                            placeholder='Enter Column Name...'
                            onChange={(e) => setAdd(e.target.value)}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' color='primary' onClick={() => newCol(add)}>Update</Button>
                        <Button variant='oultined' color="error" onClick={() => setShowDialog(false)}>Cancel</Button>
                    </DialogActions>
                </Dialog>
                <Button style={{ marginBottom: 10, marginTop: 10 }} variant="contained" onClick={() => setShowDialog(true)}>
                    Add Column
                </Button>
                <Box sx={{ height: 500, width: '100', background: "white", border: "1px solid #2c3e50", borderRadius: "10px" }}>
                    <DataGridPro
                        sx={{ background: "white", border: "1px solid #2c3e50", borderRadius: "10px" }}
                        rows={rows}
                        columns={column}
                        pinnedColumns={pinnedColumns}
                        onPinnedColumnsChange={handlePinnedColumnsChange}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            }, pinnedColumns: {
                                left: ["id"],
                            },
                        }}
                        pageSizeOptions={[5, 10, 25]}
                    />
                </Box>
            </Container>

        </div >
    );
}