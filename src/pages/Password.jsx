import ScrollArea from "../components/ScrollArea";
const passwordsList = [
  {
    id: 1,
    company: "wifi",
    username: "user@wifi.com",
    password: "user123456",
    logo: "/images/company/wifi.png",
    access: ["AD"],
  },
  {
    id: 2,
    company: "LG",
    username: "lgit@company.com",
    password: "lg123456",
    logo: "/images/company/lg.png",
    access: ["AD"],
  },
  {
    id: 3,
    company: "Google",
    username: "google.com",
    password: "google123",
    logo: "/images/company/google.png",
    access: ["LM", "JG", "SD", "AC"],
  },
  {
    id: 11,
    company: "Slack",
    username: "luuki@.mail",
    password: "user123456",
    logo: "/images/company/slack.png",
    access: ["LM", "JG"],
  },
  {
    id: 5,
    company: "AWS",
    username: "aws.com",
    password: "user123456",
    logo: "/images/company/aws.png",
    access: ["LM", "JG", "SD"],
  },
  {
    id: 6,
    company: "Zoom",
    username: "zoom.com",
    password: "user123456",
    logo: "/images/company/zoom.png",
    access: ["LM", "JG"],
  },
  {
    id: 7,
    company: "Zoom",
    username: "zoom.com",
    password: "user123456",
    logo: "/images/company/zoom.png",
    access: ["LM", "JG"],
  },
  {
    id: 8,
    company: "Zoom",
    username: "zoom.com",
    password: "user123456",
    logo: "/images/company/zoom.png",
    access: ["LM", "JG"],
  },
  {
    id: 9,
    company: "Zoom",
    username: "zoom.com",
    password: "user123456",
    logo: "/images/company/zoom.png",
    access: ["LM", "JG"],
  },
  {
    id: 10,
    company: "Zoom",
    username: "zoom.com",
    password: "user123456",
    logo: "/images/company/zoom.png",
    access: ["LM", "JG"],
  },
  {
    id: 11,
    company: "Zoom",
    username: "zoom.com",
    password: "user123456",
    logo: "/images/company/zoom.png",
    access: ["LM", "JG"],
  },
  {
    id: 12,
    company: "Zoom",
    username: "zoom.com",
    password: "user123456",
    logo: "/images/company/zoom.png",
    access: ["LM", "JG"],
  },
  {
    id: 13,
    company: "Zoom",
    username: "zoom.com",
    password: "user123456",
    logo: "/images/company/zoom.png",
    access: ["LM", "JG"],
  },
  {
    id: 14,
    company: "Zoom",
    username: "zoom.com",
    password: "user123456",
    logo: "/images/company/zoom.png",
    access: ["LM", "JG"],
  },
];
export default function Password() {
  const mypass = [1, 2];
  const myPasswords = passwordsList.filter((pass) => mypass.includes(pass.id));
  const otherPasswords = passwordsList.filter(
    (pass) => !mypass.includes(pass.id)
  );

  return (
    <div className=" grid xl:grid-cols-[1fr_20rem] gap-4 ">
      <div className="bg-white p-4 md:p-8 rounded-lg  order-2 xl:order-1 ">
        <h1 className="text-3xl font-semibold mb-8">Passwords</h1>
        <div>
          <h4 className="font-medium text-2xl capitalize mb-4">my passwords</h4>
          <ScrollArea className="max-h-[50vh] overflow-x-auto max-w-[80vw] sm:max-w-[85vw] xl:max-w-full">
            <ul className="w-full">
              {myPasswords.map((password) => (
                <li
                  className="flex justify-between gap-x-4 items-center bg-[#F7F7F7] mb-4 py-2 px-4 rounded-md w-[400px] md:w-full"
                  key={password.id}
                >
                  <div className="flex items-center gap-5">
                    <img
                      className="w-[50px] h-auto"
                      src={password.logo}
                      alt="company"
                    />
                    <h5>{password.username}</h5>
                  </div>
                  <p>{password.password}</p>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
        <div className="mt-10">
          <h4 className="font-medium text-2xl capitalize mb-4">
            all passwords
          </h4>
          <ScrollArea className="max-h-[50vh] overflow-x-auto max-w-[80vw]  sm:max-w-[85vw] xl:max-w-full">
            <ul className="w-full">
              {otherPasswords.map((password) => (
                <li
                  key={password.id}
                  className="bg-[#F7F7F7] flex justify-between items-center gap-x-20 mb-4 py-2 px-4 rounded-md w-[600px] md:w-full"
                >
                  <div className="flex items-center gap-x-10 flex-1">
                    <img
                      className="w-[40px] h-auto"
                      src={password.logo}
                      alt="company"
                    />
                    <h5>{password.username}</h5>
                    <p>{password.password}</p>
                  </div>

                  <div className="flex gap-x-2">
                    {password.access.map((access, index) => (
                      <button
                        className="bg-[#E6E7EA] p-1.5 rounded-full cursor-pointer"
                        key={index}
                      >
                        {access}
                      </button>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      </div>
      <div className="bg-white p-4 md:p-8 rounded-lg  order-1 xl:order-2 ">
        <h1 className="text-3xl font-semibold mb-8">Add Account</h1>
        <form action="" className="space-y-10">
          <div>
            <label
              className="font-medium mb-2 inline-block ml-1"
              htmlFor="logo"
            >
              Logo
            </label>
            <input
              className="border border-gray-200 py-3 px-2 w-full bg-[#F1F2F4] rounded-lg"
              id="logo"
              type="file"
            />
          </div>
          <div>
            <label
              className="font-medium mb-2 inline-block ml-1"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="outline-none py-3 px-2 w-full bg-[#F1F2F4] rounded-lg"
              id="username"
              type="text"
            />
          </div>
          <div>
            <label
              className="font-medium mb-2 inline-block ml-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="outline-none py-3 px-2 w-full bg-[#F1F2F4] rounded-lg"
              id="password"
              type="text"
            />
          </div>
          <button className="bg-deepBlue py-3 px-4 block w-full text-gray-200 cursor-pointer uppercase rounded-lg font-bold">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
