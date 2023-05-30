import React from 'react';

function HelpBox() {
    return (
        <>
            <div >
                <div className="card w-100 border-0 p-0 rounded-3 overflow-hidden bg-image-contain bg-image-center" >
                    <div className="card-body p-md-5 p-4 text-center" style={ { backgroundColor: "rgba(0, 85, 255, 0.8)" } }>
                        <h2 className="fw-700 display2-size text-white display2-md-size lh-2">
                            Welcome to the Sociala Commuinity!
                        </h2>
                        <p className="font-xsss ps-lg-5 pe-lg-5 lh-28 text-grey-200">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus
                        </p>
                        <div className="form-group w-lg-75 mt-4 border-light border p-1 bg-white rounded-3 ms-auto me-auto">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="form-group icon-input mb-0">
                                        <i className="ti-search font-xs text-grey-400"></i>
                                        <input type="text" className="style1-input border-0 ps-5 font-xsss mb-0 text-grey-500 fw-500 bg-transparent" placeholder="Search anythings.." />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <a href="helpbox" className="w-100 d-block btn bg-current text-white font-xssss fw-600 ls-3 style1-input p-0 border-0 text-uppercase ">
                                        Search
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card w-100 border-0 shadow-none bg-transparent mt-5">
                    <div data-accordion-component="Accordion" className="accodion-style--1 accordion">
                        <div data-accordion-component="AccordionItem" className="card shadow-xss">
                            <div data-accordion-component="AccordionItemHeading" className="card-header" role="heading" aria-level="3">
                                <div className="accordion__button" id="accordion__heading-raa-0" aria-disabled="true" aria-expanded="true" aria-controls="accordion__panel-raa-0" role="button" tabIndex="0" data-accordion-component="AccordionItemButton">
                                    <h5 className="fw-600 pt-2 pb-2 mb-0">
                                        I have read and agree to the Privacy Policy and Terms amp; Conditions*
                                    </h5>
                                </div>
                            </div>
                            <div data-accordion-component="AccordionItemPanel" className="card-body" id="accordion__panel-raa-0">
                                <p>
                                    Câu trả lời
                                </p>
                            </div>
                        </div>
                        <div data-accordion-component="AccordionItem" className="card shadow-xss">
                            <div data-accordion-component="AccordionItemHeading" className="card-header" role="heading" aria-level="3">
                                <div className="accordion__button" id="accordion__heading-raa-1" aria-disabled="false" aria-expanded="false" aria-controls="accordion__panel-raa-1" role="button" tabIndex="0" data-accordion-component="AccordionItemButton">
                                    <h5 className="fw-600 pt-2 pb-2 mb-0">
                                        You can easily build a page without any design or custom coding.
                                    </h5>
                                </div>
                            </div>
                            <div data-accordion-component="AccordionItemPanel" className="card-body" id="accordion__panel-raa-1" hidden="">
                                <p>
                                    Câu trả lời
                                </p>
                            </div>
                        </div>
                        <div data-accordion-component="AccordionItem" className="card shadow-xss">
                            <div data-accordion-component="AccordionItemHeading" className="card-header" role="heading" aria-level="3">
                                <div className="accordion__button" id="accordion__heading-raa-2" aria-disabled="false" aria-expanded="false" aria-controls="accordion__panel-raa-2" role="button" tabIndex="0" data-accordion-component="AccordionItemButton">
                                    <h5 className="fw-600 pt-2 pb-2 mb-0">
                                        I have read and agree to the Privacy Policy and Terms amp; Conditions*
                                    </h5>
                                </div>
                            </div>
                            <div data-accordion-component="AccordionItemPanel" className="card-body" id="accordion__panel-raa-2" hidden="">
                                <p>
                                    Câu trả lời
                                </p>
                            </div>
                        </div>
                        <div data-accordion-component="AccordionItem" className="card shadow-xss">
                            <div data-accordion-component="AccordionItemHeading" className="card-header" role="heading" aria-level="3">
                                <div className="accordion__button" id="accordion__heading-raa-3" aria-disabled="false" aria-expanded="false" aria-controls="accordion__panel-raa-3" role="button" tabIndex="0" data-accordion-component="AccordionItemButton">
                                    <h5 className="fw-600 pt-2 pb-2 mb-0">
                                        You can easily build a page without any design or custom coding.
                                    </h5>
                                </div>
                            </div>
                            <div data-accordion-component="AccordionItemPanel" className="card-body" id="accordion__panel-raa-3" hidden="">
                                <p>
                                    Câu trả lời                                
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HelpBox;
