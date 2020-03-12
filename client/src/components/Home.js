import React from "react";

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto mt-5">
            <h1 className="text-center">Home page</h1>
            <h2 className="text-center display-4 mt-5">
              This is home page protected page to access !
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
