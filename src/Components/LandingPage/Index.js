import React, { Component } from "react"
import Header from "./Header";
import Content from './Content';
import Footer from "./Footer";

class Index extends Component {
    render() {
        return (
            <div className="main-container">
                <Header />
                <Content />
                <Footer />
            </div>

        )
    }
}
export default Index;