const { properties } = require("../lib/constant");

export const getImageUrl = (home, i) => {
    let imageUrl;
    if (home.photosInfo.alternatePhotosInfo) {
        const gp = home.photosInfo?.alternatePhotosInfo[0].groupCode;
        const version = home.photosInfo?.alternatePhotosInfo[0].positionSpec[i];
        // Standard Redfin CDN format
        imageUrl = `https://ssl.cdn-redfin.com/system_files/media/${gp}/item_${version}.jpg`;

    } else if (home.photosInfo?.photoRanges) {
        const dsip = home.dataSourceId.value
        const mId = home.mlsId ? String(home.mlsId).slice(-3) : ''
        const version = home.photosInfo?.photoRanges[0].version;
        imageUrl = `https://ssl.cdn-redfin.com/photo/${dsip}/mbphotov3/${mId}/genMid.${home.mlsId}_${i + 1}_${version}.jpg`
    } else{
        imageUrl = `https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4`
    }
    return imageUrl
};
export const getBackgroundImageUrl = (property) => {
    if (property.photosInfo?.photoRanges) {
        const dsip = property.dataSourceId.value
        const mId = property.mlsId ? String(property.mlsId).slice(-3) : ''
        const version = property.photosInfo?.photoRanges[0].version;
        return `https://ssl.cdn-redfin.com/photo/${dsip}/islphoto/${mId}/genIslnoResize.${property.mlsId}_${version}.jpg`
    }else{
        return `https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4`
    }
}

let data = [];
for (let i = 0; i < properties.length; i++) {
    const property = properties[i]
    const propertyData = property?.homeData
    let photos = []
    for (let i = 0; i < propertyData.photosInfo.photoRanges?.[0]?.endPos; i++) {
        let image = getImageUrl(propertyData, i)
        photos.push(image);
    }
    let item = {
        index: i,
        url: `https://www.redfin.com${propertyData.url}`,
        images: photos,
    }
    data.push(item)
}