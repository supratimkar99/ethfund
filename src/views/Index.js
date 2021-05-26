import React, { Component } from "react"
import Header from "../Components/Header/Header";
import Content from './Content';
import Footer from "../Components/Footer/Footer";

class Index extends Component {
    render() {
        return (
            <div class="main-container">
                <Header />
                <Content />
                <Footer />
            </div>

        )
    }
}
export default Index;