import { FaBed, FaCalendarAlt, FaDollarSign, FaHome, FaSchool, FaSearch, FaSwimmingPool } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

export const searchFilters = {
    region_id: '30749',//You need to use regex to extract the value of id field returned in .../auto-complete endpoint. Ex : '2_30749', 30749 is the value you need to extract from the string.
    region_type: '6',//One of the following : -1:Unknowns|1:Neighborhood|2:Zip Code|4:State|5:County|6:City|7:School|8:School District|9:Service Region|10:Minor Civil Division|11:Country|30:CA Postal Code|31:CA Province|32:CA Provincial Division|33:CA Municipality|34:CA Forward Sortation Area You need to use regex to examine the value of url field returned in .../auto-complete for suitable value. Ex : '/city/30749/...', it is city so it is 6 in this case.
    sf: '1,2,3,5,6,7',//MLS listings, uses of the following : 1,7-Agent listed Homes|2-MLS listed foreclosures|3-For sale by owner|4-Foreclosures|5,6-New construction Separated by comma for multiple options. Ex : 1,2,3,5,6,7
    uipt: '1,2,3,4,7,8',//Property types, uses of the following : 1-Home|2-Condo|3-Townhouse|4-Multi-family|5-Land|6-Other|7-Manufactured|8-Co-op Separated by comma for multiple options. Ex : 1,2,3,4,7,8
    num_homes: '1',//Number of items per response (Max 400). Redfin always return max 400 properties for every search, there is no paging feature.
    status: '9',//One of the following : 1-Active listings|8-Coming soon listings|9-Active + coming soon listings|130-Only under contract/pending|131-Active + under contract/pending
    max_listing_approx_size: '1',//Square Feet
    min_listing_approx_size: '1',//Square Feet
    max_parcel_size: '1',//Lot size
    min_parcel_size: '1',// Lot size
    max_price: '645000',
    min_price: '350000',
    max_price_per_sqft: '4565',
    min_price_per_sqft: '2998',
    max_stories: '3',
    min_stories: '1',
    max_year_built: '3',
    min_year_built: '1',
    num_baths: '4',//Filter by number of baths at least. Ex : 2.5
    num_beds: '4',//Filter by number of beds room at least. Ex : 2
    pkg: '4',//Garage spots 1-|2-|3-|4-|5- (You need to put the minus behind every numbers)
    sold_within_days: '5',//Use this parameter to list SOLD properties. If you pass this parameter, leave sf parameter empty.
    time_on_market_range: '3',//Time on Redfin, you need to put the minus before/after every numbers. Ex : 1-:Less than 1 day|3-:Less than 3 days|7-|14-|30-|-30:More than 30 days|-60|-120|-:For any time
    open_house: '1',//1-Any time|2-This weekend
    virtual_tour: 'true',
    excl_ar: 'true',//true : Exclude 55+ communities
    rd: '7',//Price reduce, you need to put the minus before/after every numbers. Ex : 1-:Less than 1 day|3-:Less than 3 days|7-|14-|30-|-30:More than 30 days|-60|-120|-:For any time
    excl_ss: 'true',//true : Exclude short leases
    excl_ll: 'true',//true : Exclude land leases
    fixer: 'true',//true : Fixer Uppers Only
    pool_types: '1',//One of the following : 1-Private pool|2-Community pool|3-Private or Community pool|4-No private pool
    include_outdoor_parking: 'true',
    rv_parking: 'true',
    ac: 'true',
    fireplace: 'true',
    primary_bed_on_main: 'true',//true : has primary bedroom on main floor
    wf: 'true',//true : has water front
    view: 'true',
    basement_types: '1',//One of the following : 1-Finished|3-Unfinished. Separated by comma for multiple options. Ex : 1,3
    pets_allowed: 'true',
    wd: 'true',//true : has washer/dryer hookup
    guest_house: 'true',
    accessible: 'true',
    elevator: 'true',
    green: 'true',//true : Green Home
    walk_score: '30',//Filter by walk score, you need to put the minus after every numbers. Ex : 10-|20-|30-|etc...
    transit_score: '30',//Filter by transit score, you need to put the minus after every numbers. Ex : 10-|20-|30-|etc...
    bike_score: '30',//Filter by bike score, you need to put the minus after every numbers. Ex : 10-|20-|30-|etc...
    school_rating: '8',//Filter by school rate, you need to put the minus after every numbers. Ex : 1-|2-|3-|...|10-
    school_types: 'Elementary',//Use along with school_rating parameter. One of the following : 1-Elementary schools|2-Middle schools|3-High schools. Separated by comma for multiple options. Ex : 1,2,3
    unrated_schools: 'true',//true : Include unrated schools. Use along with school_rating parameter.
    hoa: '0',//HOA fees. Ex : 0|25|50|75|...|2000
    max_property_tax: '750'
}

// Options for select filters (parsed from comments)
export const OPTIONS = {
    region_type: [
        { value: '-1', label: 'Unknown' },
        { value: '1', label: 'Neighborhood' },
        { value: '2', label: 'Zip Code' },
        { value: '4', label: 'State' },
        { value: '5', label: 'County' },
        { value: '6', label: 'City' },
        { value: '7', label: 'School' },
        { value: '8', label: 'School District' },
        { value: '9', label: 'Service Region' },
        { value: '10', label: 'Minor Civil Division' },
        { value: '11', label: 'Country' },
        { value: '30', label: 'CA Postal Code' },
        { value: '31', label: 'CA Province' },
        { value: '32', label: 'CA Provincial Division' },
        { value: '33', label: 'CA Municipality' },
        { value: '34', label: 'CA Forward Sortation Area' }
    ],
    sf: [
        { value: '1', label: 'Agent listed Homes' },
        { value: '2', label: 'MLS listed foreclosures' },
        { value: '3', label: 'For sale by owner' },
        { value: '4', label: 'Foreclosures' },
        { value: '5', label: 'New construction' },
        { value: '6', label: 'New construction' },
        { value: '7', label: 'Agent listed Homes' }
    ],
    uipt: [
        { value: '1', label: 'Home' },
        { value: '2', label: 'Condo' },
        { value: '3', label: 'Townhouse' },
        { value: '4', label: 'Multi-family' },
        { value: '5', label: 'Land' },
        { value: '6', label: 'Other' },
        { value: '7', label: 'Manufactured' },
        { value: '8', label: 'Co-op' }
    ],
    status: [
        { value: '1', label: 'Active listings' },
        { value: '8', label: 'Coming soon listings' },
        { value: '9', label: 'Active + coming soon' },
        { value: '130', label: 'Only under contract/pending' },
        { value: '131', label: 'Active + under contract/pending' }
    ],
    // Add more options for pool_types, basement_types, school_types, time_on_market_range, etc.
    pool_types: [
        { value: '1', label: 'Private pool' },
        { value: '2', label: 'Community pool' },
        { value: '3', label: 'Private or Community pool' },
        { value: '4', label: 'No private pool' }
    ],
    basement_types: [
        { value: '1', label: 'Finished' },
        { value: '3', label: 'Unfinished' }
    ],
    school_types: [
        { value: 'Elementary', label: 'Elementary schools' },
        { value: 'Middle', label: 'Middle schools' },
        { value: 'High', label: 'High schools' }
    ],
    // ... abbreviating for brevity, extend similarly
};

export const FILTER_GROUPS = [
    {
        title: 'Location',
        icon: MdLocationOn,
        filters: ['region_id', 'region_type']
    },
    {
        title: 'Sources & Status',
        icon: FaSearch,
        filters: ['sf', 'status', 'sold_within_days', 'time_on_market_range', 'open_house']
    },
    {
        title: 'Property Types',
        icon: FaHome,
        filters: ['uipt']
    },
    {
        title: 'Price & Size',
        icon: FaDollarSign,
        filters: ['min_price', 'max_price', 'min_price_per_sqft', 'max_price_per_sqft', 'min_listing_approx_size', 'max_listing_approx_size', 'min_parcel_size', 'max_parcel_size']
    },
    {
        title: 'Rooms & Age',
        icon: FaBed,
        filters: ['num_beds', 'num_baths', 'min_stories', 'max_stories', 'min_year_built', 'max_year_built', 'pkg']
    },
    {
        title: 'Amenities',
        icon: FaSwimmingPool,
        filters: ['pool_types', 'ac', 'fireplace', 'virtual_tour', 'wf', 'view', 'basement_types', /* etc all checkboxes/switches */]
    },
    {
        title: 'Scores & Schools',
        icon: FaSchool,
        filters: ['walk_score', 'transit_score', 'bike_score', 'school_rating', 'school_types', 'unrated_schools']
    },
    {
        title: 'Other',
        icon: FaCalendarAlt,
        filters: ['hoa', 'max_property_tax', 'excl_ar', 'excl_ss', /* remaining */]
    }
    // Ensure all 52 covered by distributing
];

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
    } else {
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
    } else {
        return `https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4`
    }
}