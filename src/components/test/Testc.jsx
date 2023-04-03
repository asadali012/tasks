
//---------------------------------------------------------
// using params from URL only giving 10 results on one page
//---------------------------------------------------------

import React, { useState, useEffect } from "react";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";

const PRODUCTS_API = "https://dummyjson.com/products";


// console.log(filteredProducts.product);
export default function Testc() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [search, setsearch] = useState("");

    const getProducts = async (skip, limit) => {
        const response = await fetch(
            `${PRODUCTS_API}/?limit=${limit}&skip=${skip}`
        );
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setTotal(data.length);
    };



    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleNext = () => {
        const newPage = page + 1;
        handlePageChange(newPage);
        const skip = (newPage - 1) * limit;
        getProducts(skip, limit);
    };

    const handlePrev = () => {
        const newPage = page - 1;
        handlePageChange(newPage);
        const skip = (newPage - 1) * limit;
        getProducts(skip, limit);
    };

    useEffect(() => {
        const skip = (page - 1) * limit;
        getProducts(skip, limit);
    }, [page, limit]);

    const fields = ["title", "description", "price", "images"];

    return (
        <TableContainer component={Paper}>
            <TextField
                label="Search"
                variant="outlined"
                onChange={(e) => setsearch(e.target.value)}
                sx={{ m: 2 }}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        {fields
                            .map((field) => (
                                <TableCell key={field}>
                                    {field.toUpperCase()}
                                </TableCell>
                            ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredProducts.products
                        ?.slice((page - 1) * limit, page * limit)
                        ?.filter((item) => {
                            return search.toLowerCase() === ""
                                ? item
                                : item.title.toLowerCase().includes(search.toLowerCase());
                        })
                        ?.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.title}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>
                                    <img
                                        src={product.images[0]}
                                        alt=""
                                        style={{ height: 50, width: 50 }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <Button
                variant="outlined"
                onClick={handlePrev}
                disabled={page === 1}
                sx={{ m: 2 }}
            >
                <IconButton size="small" sx={{ mr: 1 }}>
                    <KeyboardArrowLeft />
                </IconButton>
                Prev
            </Button>
            <Button
                variant="outlined"
                onClick={handleNext}
                disabled={page * limit >= total}
                sx={{ m: 2 }}
            >
                Next
                <IconButton size="small" sx={{ ml: 1 }}>
                    <KeyboardArrowRight />
                </IconButton>
            </Button>
        </TableContainer>
    );
}