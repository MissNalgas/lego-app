
/**
 * Uses a proxy to resize the image and add a backround
 * 
 * @param url URL of the image
 * @returns URL of the proxy
 */
export function proxy(url: string) {
    return `https://lnk.mssnapps.com/api/image-proxy?img=${url}&jpeg=true&width=600&height=400&bg=white`;
}