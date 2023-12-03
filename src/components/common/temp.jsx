<div className='w-10/12 mx-auto my-24 flex gap-10'>
        {/* Section 1 */}
        <div className='flex gap-5'>

          {/* Company */}
          <div>

            {/* Logo */}
            <div>
              <img src={Logo} />
            </div>

            {/* Section */}
            <div>
              <h1>Company</h1>

              <div>
                {
                  company.map((element, index) => {
                    return (
                      <p>
                        {element}
                      </p>
                    )
                  })
                }
              </div>

            </div>

            {/* icons */}
            <div className='flex gap-2'>

              <FaFacebook />
              <FaGoogle />
              <FaTwitter />
              <FaYoutube />
            </div>


          </div>

          <div>
            {/* Resource */}
            <div>

              {/* Section */}
              <div>
                <h1>Resource</h1>

                <div>
                  {
                    resource.map((element, index) => {
                      return (
                        <p>

                        </p>
                      )
                    })
                  }
                </div>
              </div>

            </div>

            {/* Support */}
            <div>

              {/* Section */}
              <div>
                <h1>Support</h1>

                <div>
                  {
                    support.map((element, index) => {
                      return (
                        <p>

                        </p>
                      )
                    })
                  }
                </div>
              </div>

            </div>
          </div>


          <div>
            {/* Plan */}
            <div>

              {/* Section */}
              <div>
                <h1>Plan</h1>

                <div>
                  {
                    plan.map((element, index) => {
                      return (
                        <p>

                        </p>
                      )
                    })
                  }
                </div>
              </div>

            </div>

            {/* Community */}
            <div>

              {/* Section */}
              <div>
                <h1>Community</h1>

                <div>
                  {
                    community.map((element, index) => {
                      return (
                        <p>

                        </p>
                      )
                    })
                  }
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Section 2 */}
        <div className='flex gap-5'>

          {/* Subjects  */}
          <div>

            {/* Section */}
            <div>
              <h1>Subjects</h1>

              <div>
                {
                  subjects.map((element, index) => {
                    return (
                      <p>

                      </p>
                    )
                  })
                }
              </div>
            </div>

          </div>

          {/* Languages */}
          <div>

            {/* Section */}
            <div>
              <h1>Languages</h1>

              <div>
                {
                  languages.map((element, index) => {
                    return (
                      <p>

                      </p>
                    )
                  })
                }
              </div>
            </div>

          </div>


          {/* Career Building */}
          <div>

            {/* Section */}
            <div>
              <h1>Career Building</h1>

              <div>
                {
                  career.map((element, index) => {
                    return (
                      <p>

                      </p>
                    )
                  })
                }
              </div>
            </div>

          </div>


        </div>
      </div>