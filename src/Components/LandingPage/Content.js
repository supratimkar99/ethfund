import React from "react";

function Content() {
    return (
        <div id="container">
            <div className="container content" >
                <div className="row1">
                    <div className="col-sm-3 talk">
                        <h2>Funding Raising</h2>
                        <h5>Made Easy</h5>
                        <br/>
                        <ul>
                            <li>Use our platform to raise funds or to find interesting projects to invest into, without having to use a third-party site.</li>
                            <li>Built on a decentralized system that runs on Blockchain technology, all the drawbacks of traditional platoforms are eliminated.</li>
                        </ul>
                        <br />
                    </div>
                </div>
            </div>

            <section className="features-icons bg-light text-center det-ails">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <div className="features-icons-icon d-flex  icon-bra-ails">
                                    <i className="icon-screen-desktop m-auto text-primary icon-ails"></i>
                                </div>
                                <h5>Cross-browser Compatibility</h5>
                                <p className="lead mb-0">Our services can be accessed through multiple browsers.</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <div className="features-icons-icon d-flex  icon-bra-ails">
                                    <i className="icon-layers m-auto text-primary icon-ails"></i>
                                </div>
                                <h5>Secure</h5>
                                <p className="lead mb-0">Use of decentralised architecture ensures a safe and secure platform for our users. </p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                                <div className="features-icons-icon d-flex  icon-bra-ails">
                                    <i className="icon-check m-auto text-primary icon-ails"></i>
                                </div>
                                <h5>Trusted</h5>
                                <p className="lead mb-0">Trusted by many business owners and users.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Content;