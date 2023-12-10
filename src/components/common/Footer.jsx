import React from 'react'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa"
import { FooterLink2 } from "../../data/footer-links"
import { NavLink } from 'react-router-dom'

const company = ["About", "Careers", "Affiliates"]

const resource = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces"
]
const support = [
  "Help Center"
]

const plan = [
  "Paid memberships",
  "For students",
  "Business solutions"
]
const community = [
  "Forums",
  "Chapters",
  "Events"
]
const subjects = FooterLink2[0]
const languages = FooterLink2[1]
const career = FooterLink2[2]

const bottomFooter = [
  "Privacy Policy",
  "Cookie Policy",
  "Terms",
]

export const Footer = () => {
  return (
    <section className='w-full bg-richblack-800'>

      <div className="w-10/12 mx-auto py-16">

        {/* ---------------------- footer 1 ------------------------------ */}
        <footer className='w-full flex gap-3 lg:flex-row flex-col
                    font-inter bg-richblack-800'>

          {/* ---------------------- Section 1 ------------------------------ */}
          <section className='w-full flex lg:mr-12 gap-3 lg:w-1/2 justify-between'>

            {/* Company */}
            <div className='w-[30%] flex flex-col gap-5'>

              {/* Logo */}
              <img src={Logo}
                className='text-richblack-50'
                width={160}
                height={32} />


              {/* Section Name */}
              <h1 className='text-richblack-50 font-semibold'>
                Company
              </h1>

              {/* List items */}
              <ul className='flex flex-col gap-3'>
                {
                  company.map((element, index) => {
                    return (
                      <li key={index}
                        className='text-richblack-400 text-sm'>
                        <NavLink to={`/${element.split(" ").join("-").toLowerCase()}`}>
                          {element}
                        </NavLink>
                      </li>
                    )
                  })
                }
              </ul>

              {/* icons */}
              <div className='flex gap-3 text-richblack-400'>

                <FaFacebook width={24} height={24} />
                <FaGoogle width={24} height={24} />
                <FaTwitter width={24} height={24} />
                <FaYoutube width={24} height={24} />
              </div>

            </div>

            <div className='w-1/3 flex flex-col gap-9'>

              {/* Resource */}
              <div className='flex flex-col gap-3'>

                {/* Section Name */}
                <h1 className='text-richblack-50 font-semibold'>
                  Resource
                </h1>

                {/* List Items */}
                <ul className='flex flex-col gap-3'>
                  {
                    resource.map((element, index) => {
                      return (
                        <li key={index}
                          className='text-richblack-400 text-sm'>
                          <NavLink to={`/${element.split(" ").join("-").toLowerCase()}`}>
                            {element}
                          </NavLink>
                        </li>
                      )
                    })
                  }
                </ul>

              </div>

              {/* Support */}
              <div className='flex flex-col gap-3'>

                {/* Section Name */}
                <h1 className='text-richblack-50 font-semibold'>
                  Support
                </h1>

                {/* List Items */}
                <ul className='flex flex-col gap-3'>
                  {
                    support.map((element, index) => {
                      return (
                        <li key={index}
                          className='text-richblack-400 text-sm'>
                          <NavLink to={`/${element.split(" ").join("-").toLowerCase()}`}>
                            {element}
                          </NavLink>
                        </li>
                      )
                    })
                  }
                </ul>

              </div>

            </div>

            <div className='w-1/3 flex flex-col gap-3'>

              {/* Plan */}
              <div className='flex flex-col gap-3'>

                {/* Section Name */}
                <h1 className='text-richblack-50 font-semibold'>
                  Plan
                </h1>

                {/* List Items */}
                <ul className='flex flex-col gap-3'>
                  {
                    plan.map((element, index) => {
                      return (

                        <li key={index}
                          className='text-richblack-400 text-sm'>

                          <NavLink to={`/${element.split(" ").join("-").toLowerCase()}`}>

                            {element}

                          </NavLink>

                        </li>
                      )
                    })
                  }
                </ul>

              </div>

              {/* Community */}
              <div className='flex flex-col gap-3'>

                {/* Section Name */}
                <h1 className='text-richblack-50 font-semibold'>
                  Community
                </h1>

                {/* List Items */}
                <ul className=' flex flex-col gap-3'>

                  {

                    community.map((element, index) => {
                      return (

                        <li key={index}
                          className='text-richblack-400 text-sm'>

                          <NavLink to={`/${element.split(" ").join("-").toLowerCase()}`}>

                            {element}

                          </NavLink>

                        </li>

                      )
                    })
                  }

                </ul>

              </div>

            </div>

          </section>

          {/* Border */}
          <div className='lg:w-[2px] lg:h-[538px] bg-[#2C333F]'></div>

          {/* ---------------------- Section 2 ------------------------------ */}
          <section className='w-full flex lg:ml-3 lg:w-1/2 justify-between'>

            {/* Subjects  */}
            <div className='flex flex-col gap-3 w-[30%]'>

              {/* Section Name */}

              <div>
                <h1 className='font-semibold text-richblack-50'>
                  {subjects.title}
                </h1>
              </div>

              {/* List Items */}
              <div className='flex flex-col gap-3'>
                {
                  subjects.links.map((element, index) => {
                    return (
                      <p key={index} className='text-richblack-400 text-sm'>
                        <NavLink to={`${subjects.links}`}>
                          {element.title}
                        </NavLink>
                      </p>
                    )
                  })
                }
              </div>

            </div>

            {/* Languages */}
            <div className='space-y-3 w-1/3'>

              {/* Section Name */}
              <div className='text-richblack-50 font-semibold'>
                <h1>
                  {languages.title}
                </h1>
              </div>

              {/* List Items */}
              <div className='flex flex-col gap-3'>
                {
                  languages.links.map((element, index) => {
                    return (
                      <p key={index} className='text-richblack-400 text-sm'>
                        <NavLink to={`${languages.links}`}>
                          {element.title}
                        </NavLink>
                      </p>
                    )
                  })
                }
              </div>


            </div>

            {/* Career Building */}
            <div className='space-y-3 w-1/3'>

              {/* Section Name */}
              <div className='text-richblack-50 font-semibold'>
                <h1>
                  {career.title}
                </h1>
              </div>

              {/* List Items */}
              <div className='flex flex-col gap-3'>
                {
                  career.links.map((element, index) => {
                    return (
                      <p key={index} className='text-richblack-400 text-sm'>
                        <NavLink to={`${element.link}`}>
                          {element.title}
                        </NavLink>
                      </p>
                    )
                  })
                }
              </div>


            </div>

          </section>

        </footer>

        <div className='py-8'>
          <div className='w-11/12 mx-auto h-[1px] bg-[#2C333F]'></div>
        </div>

        {/* ---------------------- footer 2 ------------------------------ */}
        <footer className='w-full flex lg:flex-row flex-col items-center
                  lg:justify-between gap-3 text-richblack-300'>
          <div className='flex'>
            {
              bottomFooter.map((element, index) => {
                return (
                  <div key={index} className='flex items-center justify-center'>
                    <p >
                      <NavLink to={`${element.split(" ").join("-").toLowerCase()}`}>
                        {element}
                      </NavLink>
                    </p>

                    {bottomFooter.length - 1 > index &&
                      <div className='mx-2 w-[1px] h-4 bg-richblack-500'>
                      </div>
                    }
                  </div>
                )
              })
            }
          </div>
          <p>Made with ♥ CodeHelp © 2023 Studynotion</p>
        </footer>
      </div>

    </section>
  )
}


