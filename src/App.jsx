import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/ProductPage";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="product" element={<Product />} />
                    <Route path="pricing" element={<Pricing />} />
                </Routes>
            </BrowserRouter>
            <div>Test</div>
        </>
    );
}

export default App;
