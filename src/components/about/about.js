import { profileData } from '../../core/data.js';

if (document.getElementById('bio-text') && profileData) {
    document.getElementById('bio-text').innerHTML = profileData.bio;
}
