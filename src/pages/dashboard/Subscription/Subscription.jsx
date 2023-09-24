import React, { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-hot-toast";
import "./subscription.css";
import PaypalModalIntegration from "../JobsZone/PaypalModalIntegration";

const Subscription = ({ auth }) => {


  const handlePlanUpgrade = (newPlan) => {
    const UserProfilePlan = auth?.user?.subscription?.plan;
    const planOrder = ["free", "basic", "premium"];
  
    if (newPlan === UserProfilePlan) {
      // User is trying to subscribe to the same plan
      return false;
    }
  
    if (planOrder.indexOf(newPlan) < planOrder.indexOf(UserProfilePlan)) {
      // User is trying to downgrade
      return false;
    }
  
    // User is upgrading or switching to a different plan
    return true;
  };
  
  
  return (
    <section className="pricing_section">
      <div className="container">
        <div className="sec-title text-center">
          <span className="title"> Cost Plus Parts </span>
          <h2>Choose a Plan</h2>
          <h4 className="dl_text">
            Your current Plan is
            <span
              style={{
                textTransform: "capitalize !important",
                margin: "0 5px",
              }}
            >
              {auth?.user?.subscription?.plan}
            </span>
          </h4>
        </div>
        <div className="outer-box">
          <div className="row">
            <div className="pricing-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp">
              <div className="inner-box">
                <div className="icon-box">
                  <div className="icon-outer">
                    <i className="fas fa-paper-plane" />
                  </div>
                </div>
                <div className="price-box">
                  <div className="title"> Free </div>
                  <h4 className="price">$0.00</h4>
                </div>
                <ul className="features">
                  <li className="true">Montly 10 hours </li>
                  <li className="true">Free Lunch And Coffee</li>
                  <li className="true">Certificate</li>
                  <li className="false">Easy Access</li>
                  <li className="false">Free Contacts</li>
                </ul>
                <div className="btn-box">
                  {handlePlanUpgrade("free") ? (
                    <PaypalModalIntegration title={"Subscribe"} plan={"free"} />
                  ) : (
                    <p style={{ color: "black " }}>You have Different Choice</p>
                  )}
                  {/* <button
                    onClick={(e) => handlePlanUpgrade("free")}
                    className="btn theme-btn"
                  >
                    Free
                  </button> */}
                </div>
              </div>
            </div>
            {/* Pricing Block */}
            <div
              className="pricing-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp"
              data-wow-delay="400ms"
            >
              <div className="inner-box">
                <div className="icon-box">
                  <div className="icon-outer">
                    <i className="fas fa-gem" />
                  </div>
                </div>
                <div className="price-box">
                  <div className="title">Basic</div>
                  <h4 className="price">$99.99</h4>
                </div>
                <ul className="features">
                  <li className="true">Montly 30 hours </li>
                  <li className="true">Free Lunch And Coffee</li>
                  <li className="true">Certificate</li>
                  <li className="true">Easy Access</li>
                  <li className="false">Free Contacts</li>
                </ul>
                <div className="btn-box">
                  {handlePlanUpgrade("basic") ? (
                    <PaypalModalIntegration
                      title={"Subscribe"}
                      plan={"basic"}
                    />
                  ) : (
                    <p style={{ color: "black " }}>You have Different Choice</p>
                  )}
                  {/* <button
                    onClick={(e) => handlePlanUpgrade("basic")}
                    className="btn theme-btn"
                  >
                    Subscribe
                  </button> */}
                </div>
              </div>
            </div>
            {/* Pricing Block */}
            <div
              className="pricing-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp"
              data-wow-delay="800ms"
            >
              <div className="inner-box">
                <div className="icon-box">
                  <div className="icon-outer">
                    <i className="fas fa-rocket" />
                  </div>
                </div>
                <div className="price-box">
                  <div className="title">Premium</div>
                  <h4 className="price">$199.99</h4>
                </div>
                <ul className="features">
                  <li className="true">Montly 300 hours </li>
                  <li className="true">Free Lunch And Coffee</li>
                  <li className="true">Certificate</li>
                  <li className="true">Easy Access</li>
                  <li className="true">Free Contacts</li>
                </ul>
                <div className="btn-box  ">
                  {handlePlanUpgrade("premium") ? (
                    <PaypalModalIntegration
                      title={"Subscribe"}
                      plan={"premium"}
                    />
                  ) : (
                    <p style={{ color: "black " }}>You have Different Choice</p>
                  )}
                  {/* <button
                    className="btn theme-btn"
                    onClick={(e) => handlePlanUpgrade("premium")}
                  >
                    Subscribe
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, null)(Subscription);
