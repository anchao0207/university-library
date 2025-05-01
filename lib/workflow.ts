import { Client as WorkflowClient } from "@upstash/workflow";
// import { Client as QStashClient, resend } from "@upstash/qstash";
import emailjs from "@emailjs/browser";
import config from "./config";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.uptash.qstashUrl,
  token: config.env.uptash.qstashToken,
});

// const qstashClient = new QStashClient({ token: config.env.uptash.qstashToken });

export const sendEmail = ({
  email,
  name,
  newUser,
  templateId,
}: {
  email: string;
  name: string;
  newUser?: boolean;
  templateId: string;
}) => {
  emailjs
    .send(
      config.env.emailjs.serviceId,
      templateId,
      {
        name: name,
        email: email,
        newUser: newUser,
      },
      config.env.emailjs.publicKey
    )
    .then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
      },
      (error) => {
        console.log("FAILED...", error);
      }
    );
  // await qstashClient.publishJSON({
  //   // api: {
  //   //   name: "email",
  //   //   provider: resend({ token: config.env.resendToken }),
  //   // },
  //   url: "https://api.emailjs.com/api/v1.0/email/send",
  //   body: [
  //     {
  //       service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  //       template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
  //       user_id: process.env.NEXT_PUBLIC_EMAILJS_USER_ID!,
  //       template_params: {
  //         name: name,
  //       },
  //     },
  //   ],
  // });
};
