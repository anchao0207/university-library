import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient } from "@upstash/qstash";
// import emailjs from "@emailjs/browser";
import config from "./config";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.uptash.qstashUrl,
  token: config.env.uptash.qstashToken,
});

const qstashClient = new QStashClient({ token: config.env.uptash.qstashToken });

export const sendEmail = async ({
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
  // emailjs
  //   .send(
  //     config.env.emailjs.serviceId,
  //     templateId,
  //     {
  //       name: name,
  //       email: email,
  //       newUser: newUser,
  //     },
  //     config.env.emailjs.publicKey
  //   )
  //   .then(
  //     (response) => {
  //       console.log("SUCCESS!", response.status, response.text);
  //     },
  //     (error) => {
  //       console.log("FAILED...", error);
  //     }
  //   );
  await qstashClient.publishJSON({
    // api: {
    //   name: "email",
    //   provider: resend({ token: config.env.resendToken }),
    // },
    url: "https://api.emailjs.com/api/v1.0/email/send",
    body: {
      service_id: config.env.emailjs.serviceId,
      template_id: templateId,
      user_id: config.env.emailjs.publicKey,
      template_params: {
        name: name,
        email: email,
        newUser: newUser,
      },
      accessToken: config.env.emailjs.privateKey,
    },
  });
};
