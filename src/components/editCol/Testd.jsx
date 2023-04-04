import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { useState, useEffect } from 'react';
import { Button, Container, Dialog, DialogActions, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';


export default function Testd() {

    const [rows, setRows] = useState([])
    const [showDialog, setShowDialog] = useState(false)
    const [add, setAdd] = useState('')

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
            field: 'image',
            headerName: 'Image',
            type: 'image',
            sortable: false,
            filterable: false,
            renderCell: (params) => <img src={params.value} alt="Product" style={{ border: '1px solid #ddd', width: '90%', height: '90%', objectFit: 'cover' }} />
        },
    ])
    const [pinnedColumns, setPinnedColumns] = React.useState({
        left: ['name'],
    });

    const handlePinnedColumnsChange = React.useCallback((updatedPinnedColumns) => {
        setPinnedColumns(updatedPinnedColumns);
    }, []);

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
            filterable: false,
        }])
        setShowDialog(false)
    };

    return (
        <div style={{ background: "white", height: "100vh" }}>
            <Container >
                <Dialog open={showDialog}>
                    <DialogContent>
                        <FormControl required sx={{ m: 1, minWidth: 400 }}>
                            <InputLabel id="">Select Column</InputLabel>
                            <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={add}
                                label="Select Column *"
                                onChange={(e) => setAdd(e.target.value)}
                            >
                                {rows.map((data, index) => {
                                    if (index < 1)
                                        return (
                                            Object.keys(data).filter((x) => !column.map((y) => y.field).includes(x)).map((option) => {
                                                return (
                                                    <MenuItem id={option} value={option}>{option}</MenuItem>
                                                )
                                            })
                                        )
                                }
                                )}
                            </Select>
                        </FormControl>

                        {/* ------------ */}
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
                    <DataGrid
                        sx={{ background: "white", border: "1px solid #2c3e50", borderRadius: "10px" }}
                        rows={rows}
                        columns={column}
                        pinnedColumns={pinnedColumns}
                        onPinnedColumnsChange={handlePinnedColumnsChange}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[5, 10, 25]}
                    />
                </Box>
            </Container>

        </div >
    );
}