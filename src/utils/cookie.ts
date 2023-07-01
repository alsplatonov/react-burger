
function parseTimeString(str: string): number {
  const timeRegex = /^(\d+)([smhd]?)$/;
  const matches = str.match(timeRegex);
  if (!matches) {
    throw new Error("Invalid time string format");
  }

  const value = parseInt(matches[1]);
  const unit = matches[2];

  switch (unit) {
    case "s":
      return value;
    case "m":
      return value * 60;
    case "h":
      return value * 60 * 60;
    case "d":
      return value * 60 * 60 * 24;
    default:
      return value;
  }
}


function getCookie(name: string): string {
  const matches: RegExpMatchArray | null = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : '';
}

type DateOrNumber = Date | number;

interface CookieProps {
  path?: string;
  expires?: DateOrNumber | string; // Updated to allow string type
  [key: string]: any;
}

function setCookie(name: string, value: string, props: CookieProps = {}): void {
  props = {
    path: "/",
    ...props,
  };
  let exp = props.expires;
  if (typeof exp === "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  } else if (typeof exp === "string") { 
    const d = new Date();
    const time = parseTimeString(exp);
    d.setTime(d.getTime() + time * 1000);
    exp = props.expires = d;
  }
  if (exp instanceof Date) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    const propValue = props[propName];
    if (propValue === true) {
      updatedCookie += "; " + propName;
    } else if (propValue !== false) {
      updatedCookie += "; " + propName + "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

 function deleteCookie(name: string) {
  setCookie(name, "", { expires: -1 });
}

export { setCookie, getCookie, deleteCookie };
