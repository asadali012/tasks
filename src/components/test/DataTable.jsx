//Paginate without search with image -- DataGrid

import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
    { field: "id", headerName: "ID" },
    { field: "title", headerName: "Name", width: 300 },
    { field: "price", headerName: "Price", minWidth: 80 },
    { field: "description", headerName: "Description", minWidth: 500, sortable: false },
    {
        field: 'image',
        headerName: 'Image',
        width: 100, height: 150, sortable: false,
        renderCell: (params) => <img src={params.value} alt="Product" style={{ border: '1px solid #ddd', width: '90%', height: '90%', objectFit: 'cover' }} />
        // renderCell will render the component
    },
];

export default function DataTable() {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((response) => response.json())
            .then((data) => setTableData(data));
    }, []);


    return (
        <div style={{ height: 600, width: "100%", margin: "auto" }}>
            <DataGrid
                rows={tableData}
                columns={columns}
                pageSize={13}
                initialState={{
                    ...tableData.initialState,
                    pagination: { paginationModel: { pageSize: 10 } },
                }}
                autoHeight
            />
        </div>
    );
}
