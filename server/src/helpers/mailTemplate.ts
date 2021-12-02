export const mailTemplate = ({
  title,
  link,
  labelLink,
}: {
  title: string;
  link: string;
  labelLink: string;
}) => {
  return `
              <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
              <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the MERN-BLOG channel.</h2>
              <p>${title}</p>
              
              <a href=${link} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${labelLink}</a>
          
              <p>If the button doesn't work for any reason, you can also click on the link below:</p>
          
              <div>${link}</div>
              </div>
            `;
};
