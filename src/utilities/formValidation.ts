export async function isBase64UrlImage(base64String: string): Promise<boolean> {
  let image = new Image();
  image.src = base64String;
  let isValid = false;
  await new Promise((resolve) => {
    image.onload = function () {
      if (image.height === 0 || image.width === 0) {
        resolve((isValid = false));
        return;
      }
      resolve((isValid = true));
    };
    image.onerror = () => {
      resolve((isValid = false));
    };
  });
  return isValid;
}

export const diceValueRegex = new RegExp(
  /(?<operator>[+\-])?(?:(?<dice>(?<numberOfDice>[\d]+)?[dD](?<faces>[\d]+)(?<explode>![\d]*)?(?<implode>¡[\d]*)?(?<selective>[kd][\d]+)?)|(?<constant>[\d]+))/,
  "gm"
);
