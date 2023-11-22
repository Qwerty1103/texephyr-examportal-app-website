import React, { useEffect, useState } from 'react'
import "./dashboard.css";
//
function Dashboard() {


  return (
    <>
    
    <div className='body'>
	<header>
		<nav class="navbar navbar-expand-md navbar-dark bg-dark">
			<a class="navbar-brand" href="#">DashBoard</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav ml-auto">
					<li class="nav-item active">
						<a class="nav-link" href="#">Vansh Gurnani</a>
                    </li>
				</ul>
			</div>
		</nav>
	</header>
	<br/>
	<main>
        <div class="container text-center">
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">
                                <div class="float-left">TexID</div>
                                <div class="float-right">Tex12345</div>
                            </h5>
                            <br/>
                            <h5 class="card-title">
                                <div class="float-left">Name</div>
                                <div class="float-right">Pratham</div>
                            </h5>
                            <br/>
                            <h5 class="card-title">
                                <div class="float-left">Email</div>
                                <div class="float-right">prn@mitwpu.edu.in</div>
                            </h5>
                        </div>
                    </div>
                </div>

              <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Score Board</h5>
                    </div>
                </div>
              </div>
            </div>
        </div>
		<div class="container mt-5">

			<div class="col">
                <div class="col-md-15 mb-3">
                    <div class="card">
                      <div class="card-body text-right mt-auto">
                        <h5 class="card-title">
                            <div class="float-left">Coding Round 0</div>
                            <div class="float-right"><a href="#" class="btn btn-success float-right">Take Test</a></div>
                        </h5>
                      </div>
                      <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      <br/>
                    </div>
                  </div>
				
                <div class="col-md-15 mb-3">
                    <div class="card">
                      <div class="card-body text-right mt-auto">
                        <h5 class="card-title">
                            <div class="float-left">Coding Round 1</div>
                            <div class="float-right"><a href="#" class="btn btn-success float-right">Take Test</a></div>
                        </h5>
                      </div>
                      <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      <br/>
                    </div>
                  </div>

                <div class="col-md-15 mb-3">
                    <div class="card">
                      <div class="card-body text-right mt-auto">
                        <h5 class="card-title">
                            <div class="float-left">Coding Round 2</div>
                            <div class="float-right"><a href="#" class="btn btn-success float-right">Take Test</a></div>
                        </h5>
                      </div>
                      <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      <br/>
                    </div>
                  </div>




				<div class="col-md-15 mb-3">
                    <div class="card">
                      <div class="card-body text-right mt-auto">
                        <h5 class="card-title">
                            <div class="float-left">Coding Round 3</div>
                            <div class="float-right"><a href="#" class="btn btn-success float-right">Take Test</a></div>
                        </h5>
                      </div>
                      <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      <br/>
                    </div>
                  </div>
                  
				
			</div>
		</div>
	</main>
	
</div>
    
    </>
  )
}

export default Dashboard
