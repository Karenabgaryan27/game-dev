"use client";

import React, { useState, useEffect } from "react";
import { useApiContext } from "@/contexts/ApiContext";
import localData from "@/localData";
import { ButtonDemo, ServiceCard, InputDemo, TextareaDemo, Footer } from "@/components/index";
import { motion } from "framer-motion";
import useAlert from "@/hooks/alert/useAlert";
import useJoiValidation from "@/hooks/joi-validation/useJoiValidation";
import useMessage from "@/hooks/useMessage";

const { placeholderImage, logo, chakchaImage } = localData.images;

const ShowcaseSection = () => {
  const [inView, setIsInView] = useState(false);
  const { fetchedPages } = useApiContext();

  const { title, description, images } = fetchedPages.homePage.sections.header;

  return (
    <section
      className="showcase text-center sm:text-left  lg:min-h-[calc(100vh-80px)] flex items-center"
      id="home"
    >
      <motion.div
        onViewportEnter={() => setIsInView(true)}
        viewport={{ amount: 0.7 }}
        className="container flex justify-between items-center flex-col sm:flex-row gap-x-[50px] gap-y-[30px] flex-center"
      >
        <div className={`max-w-[490px] ${inView ? "lazy-animate" : ""}`} data-lazy="fade">
          <h4 className="sub-title mb-1 text-[18px] font-medium text-gray-600">{title}</h4>
          <h1 className="title text-3xl leading-[1.4]  md:text-5xl font-medium md:leading-[1.4] mb-10">
            {description}
          </h1>

          {/* <Link href="/get-in-touch"> */}
          <a href="#contact">
            <ButtonDemo text="Get in touch" className="rounded-full get-in-touch-btn" size="lg" />
          </a>
          {/* </Link> */}
        </div>
        <div
          className={`avatar ${inView ? "lazy-animate" : ""} delay-300 max-w-[400px] w-full`}
          data-lazy="fade"
        >
          <img src={images[0].url} alt="avatar" className="w-full h-auto rounded-lg" />
        </div>
      </motion.div>
    </section>
  );
};

const FeaturesSection = () => {
  const [inView, setIsInView] = useState(false);
  const { fetchedPages } = useApiContext();

  const { title, description, images } = fetchedPages.homePage.sections.features;

  return (
    <section className="features bg-green-50" id="features">
      <motion.div className="container" onViewportEnter={() => setIsInView(true)} viewport={{ amount: 0.3 }}>
        <div className={`${inView ? "lazy-animate" : ""}`} data-lazy="fade">
          <h2 className="text-3xl font-semibold text-center mb-3">{title}</h2>
          <h6 className="description  text-center max-w-[450px] mx-auto text-sm text-gray-500 leading-6 mb-7">
            {description}
          </h6>
        </div>

        <div className="card-group service-card-group flex flex-wrap justify-center gap-[20px]">
          <div
            className={`sm:w-[calc(100%/2-20px/2)] lg:w-[calc(100%/3-(20px*2)/3)] max-w-[320px]  ${
              inView ? "lazy-animate" : ""
            } `}
            data-lazy="fade"
            style={{ transitionDelay: "0.3s" }}
          >
            <ServiceCard
              image={<img src={images[0].url} />}
              title="Elite Coordination"
              description="Our alliance thrives on real-time strategy, teamwork, and organized assaults that dominate the battlefield."
              className={``}
            />
          </div>

          <div
            className={`sm:w-[calc(100%/2-20px/2)] lg:w-[calc(100%/3-(20px*2)/3)] max-w-[320px]  ${
              inView ? "lazy-animate" : ""
            } `}
            data-lazy="fade"
            style={{ transitionDelay: "0.6s" }}
          >
            <ServiceCard
              image={<img src={images[1].url} />}
              title="Legendary Heroes"
              description="Fight alongside iconic champions like Emrys and Gwanwen, combining their power to crush any enemy"
            />
          </div>

          <div
            className={`sm:w-[calc(100%/2-20px/2)] lg:w-[calc(100%/3-(20px*2)/3)] max-w-[320px]  ${
              inView ? "lazy-animate" : ""
            } `}
            data-lazy="fade"
            style={{ transitionDelay: "0.9s" }}
          >
            <ServiceCard
              image={<img src={images[2].url} />}
              title=" Epic Rewards"
              description="Participate in alliance events, win battles, and earn exclusive loot, buffs, and resources every day."
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const ContactSection = () => {
  const { sendMessage } = useMessage();
  const { warningAlert } = useAlert();
  const [inView, setIsInView] = useState(false);

  const { fetchedPages } = useApiContext();

  const { title, description, images } = fetchedPages.homePage.sections.contact;

  type ValidationResult = {
    error?: {
      details: {
        path: string[];
        message: string;
      }[];
    };
  };

  const [state, setState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [result, setResult] = useState<ValidationResult>({});
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
  const [isMessageSent, setIsMessageSent] = useState(false);

  const { validateContact } = useJoiValidation();

  // useEffect(() => {
  //   console.log(errorMessages);
  // }, [errorMessages]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = validateContact(state);
    if (!error) {
      warningAlert("This feature is not enabled");
      // if (isMessageSent) {
      //   warningAlert("You have already sent a message.");
      // }
      // if (!isMessageSent) {
      //   setIsMessageSent(true);
      //   sendMessage({
      //     event: e,
      //     service: "service_99999999999",
      //     template: "template_999999999999",
      //     form: e.target,
      //     public_key: "99999999999",
      //   });

      //   // send to {{email}}
      //   // sendMessage({
      //   //   event: e,
      //   //   service: "service_qn2pi8a",
      //   //   template: "template_5vq30sy",
      //   //   form: e.target,
      //   //   public_key: "BffbLRP_CBAlKQWnE",
      //   // });
      // }
    }
    if (!error) return;
    setWasSubmitted(true);
  };

  useEffect(() => setResult(validateContact(state)), [state]);

  useEffect(() => {
    if (!wasSubmitted) return;
    const errors: Record<string, string> = {};
    result?.error?.details.forEach((item) => {
      if (errors[item.path[0]]) return;
      errors[item.path[0]] = item.message;
    });
    setErrorMessages(errors);
  }, [result, wasSubmitted]);

  return (
    <section className="contact" id="contact">
      <motion.div className="container " onViewportEnter={() => setIsInView(true)} viewport={{ amount: 0.7 }}>
        <div
          className={`md:flex gap-[50px] max-w-[850px] mx-auto ${inView ? "lazy-animate" : ""}`}
          data-lazy="fade"
        >
          <div className=" flex-1">
            <h2 className="text-3xl font-semibold mb-3 text-center md:text-left">{title}</h2>
            <h6 className="description md:inline-block text-center md:text-left mx-auto md:mx-none  max-w-[450px]  text-sm text-gray-500 leading-6 mb-7">
              {/* Or reach out manually to{" "}
              <a href="mailto:example@gmail.com" className="text-blue hover:text-blue-hover  underline">
                example@gmail.com
              </a> */}
              <div dangerouslySetInnerHTML={{ __html: description }} className="mb-10"></div>

              <img src={images[0].url} alt="" className="max-w-[300px] hidden md:block mx-auto " />
            </h6>
          </div>
          <form
            className={`flex-1 ${wasSubmitted ? "was-submitted" : ""}`}
            onSubmit={onSubmit}
            // noValidate
          >
            <br />
            <InputDemo
              label={
                <div>
                  Name <span className="text-destructive">*</span>
                </div>
              }
              placeholder="Name"
              name="name"
              type="text"
              value={state.name}
              callback={onChange}
              errorMessage={errorMessages.name}
              inputClassName={errorMessages.name ? "is-invalid" : "is-valid"}
            />

            <br />
            <InputDemo
              label={
                <div>
                  Email <span className="text-destructive">*</span>
                </div>
              }
              placeholder="Email"
              name="email"
              type="email"
              value={state.email}
              callback={onChange}
              errorMessage={errorMessages.email}
              inputClassName={errorMessages.email ? "is-invalid" : "is-valid"}
            />
            <br />
            <TextareaDemo
              label={<div>Message</div>}
              placeholder="Message"
              name="message"
              type="text"
              defaultValue=""
              callback={onChange}
              value={state.message}
              errorMessage={errorMessages.message}
              textareaClassName={errorMessages.message ? "is-invalid" : "is-valid"}
            />
            <br />
            <ButtonDemo text="Send message" className="rounded-full get-in-touch-btn" size="lg" />

            <input type="text" className="hidden" name="to_name" defaultValue="Aiden" />
          </form>
        </div>
      </motion.div>
    </section>
  );
};

const IdeasSection = () => {
  const [inView, setIsInView] = useState(false);
  const [inView2, setIsInView2] = useState(false);
  return (
    <section className="ideas">
      <motion.div className="container" onViewportEnter={() => setIsInView(true)} viewport={{ amount: 0.7 }}>
        <div
          className={`banner bg-[rgb(207,241,255)] rounded-[30px] p-[40px] pb-0 shadow-md max-w-[850px] mx-auto overflow-hidden  flex flex-col items-center ${
            inView ? "lazy-animate" : ""
          }`}
          data-lazy="fade-up"
          style={{ transitionDuration: "1.2s !important", transitionTimingFunction: "ease !important" }}
        >
          <h5 className="text-2xl md:text-4xl font-semibold max-w-[380px] dark:text-black text-center md:leading-[1.3]">
            Allies Welcome, Bring Snacks and Spells
          </h5>

          <motion.div onViewportEnter={() => setIsInView2(true)} viewport={{ amount: 0.7 }}>
            <img
              src={chakchaImage}
              alt=""
              className={`block w-[400px] max-w-[90%] ${inView2 ? "lazy-animate" : ""}  mx-auto `}
              // style={{ transitionDuration: "1.2s !important", transitionTimingFunction: "ease !important" }}
              data-lazy="fade-up"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default function Content() {
  const { fetchedPages, fetchedCurrentUser } = useApiContext();

  const {
    homePage: { isLoading },
  } = fetchedPages;
  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <main className="home-page">
          <header>
            <nav className="bg-success text-white p-5 flex gap-10">
              <div className="logo">
                <img className="max-w-[30px] " src={logo} alt="" />
              </div>
              <ul className="flex items-center gap-5  ml-auto">
                <a href="#home">Home</a>
                <a href="#features">Features</a>
                <a href="#contact">Contact</a>
                <a href={` ${fetchedCurrentUser.details.id ? "/admin/dashboard" : "/admin/register"}`} target="_blank">
                  <ButtonDemo
                    text={` ${fetchedCurrentUser.details.id ? "Dashboard" : "Become a member"}`}
                    className="rounded-full border shadow-none"
                    size="lg"
                  />
                </a>
              </ul>
            </nav>
          </header>
          <ShowcaseSection />
          <FeaturesSection />
          <ContactSection />
          <IdeasSection />
          <Footer />
        </main>
      )}
    </>
  );
}

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );
};
