// src/pages/HomePage.js
import React from 'react';
import Products from "../components/products.component";
import Categories from "../components/categories.component";

const ProductsPage = () => (
    <div className="container">
        <h1>Products Page</h1>
        <div className="row">
            <div className="col-md-8">
                <Products/>
            </div>
            <div className="col-md-4">
                <Categories/>
            </div>
        </div>
    </div>
);

export default ProductsPage;
