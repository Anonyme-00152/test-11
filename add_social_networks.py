#!/usr/bin/env python3
import json

# Charger le fichier actuel
with open('client/public/sherlock-data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Créer une liste des réseaux sociaux majeurs
new_social_networks = {
    # Réseaux Sociaux Majeurs
    "TikTok": {
        "errorType": "status_code",
        "url": "https://www.tiktok.com/@{}",
        "urlMain": "https://www.tiktok.com/",
        "username_claimed": "tiktok"
    },
    "Instagram": {
        "errorType": "status_code",
        "url": "https://www.instagram.com/{}/",
        "urlMain": "https://www.instagram.com/",
        "username_claimed": "instagram"
    },
    "Facebook": {
        "errorType": "status_code",
        "url": "https://www.facebook.com/{}",
        "urlMain": "https://www.facebook.com/",
        "username_claimed": "facebook"
    },
    "Twitter": {
        "errorType": "status_code",
        "url": "https://twitter.com/{}",
        "urlMain": "https://twitter.com/",
        "username_claimed": "twitter"
    },
    "X (formerly Twitter)": {
        "errorType": "status_code",
        "url": "https://x.com/{}",
        "urlMain": "https://x.com/",
        "username_claimed": "x"
    },
    "Pinterest": {
        "errorType": "status_code",
        "url": "https://www.pinterest.com/{}/",
        "urlMain": "https://www.pinterest.com/",
        "username_claimed": "pinterest"
    },
    "Snapchat": {
        "errorType": "status_code",
        "url": "https://www.snapchat.com/add/{}",
        "urlMain": "https://www.snapchat.com/",
        "username_claimed": "snapchat"
    },
    "Discord": {
        "errorType": "status_code",
        "url": "https://discordapp.com/users/{}",
        "urlMain": "https://discord.com/",
        "username_claimed": "discord"
    },
    "Reddit": {
        "errorType": "status_code",
        "url": "https://www.reddit.com/user/{}/",
        "urlMain": "https://www.reddit.com/",
        "username_claimed": "reddit"
    },
    "Quora": {
        "errorType": "status_code",
        "url": "https://www.quora.com/profile/{}",
        "urlMain": "https://www.quora.com/",
        "username_claimed": "quora"
    },
    "Medium": {
        "errorType": "status_code",
        "url": "https://medium.com/@{}",
        "urlMain": "https://medium.com/",
        "username_claimed": "medium"
    },
    "LinkedIn": {
        "errorType": "status_code",
        "url": "https://www.linkedin.com/in/{}/",
        "urlMain": "https://www.linkedin.com/",
        "username_claimed": "linkedin"
    },
    "Tumblr": {
        "errorType": "status_code",
        "url": "https://{}.tumblr.com/",
        "urlMain": "https://www.tumblr.com/",
        "username_claimed": "tumblr"
    },
    "Line": {
        "errorType": "status_code",
        "url": "https://line.me/{}",
        "urlMain": "https://line.me/",
        "username_claimed": "line"
    },
    "Viber": {
        "errorType": "status_code",
        "url": "https://viber.com/{}",
        "urlMain": "https://viber.com/",
        "username_claimed": "viber"
    },
    "WhatsApp": {
        "errorType": "status_code",
        "url": "https://wa.me/{}",
        "urlMain": "https://www.whatsapp.com/",
        "username_claimed": "whatsapp"
    },
    "Telegram": {
        "errorType": "status_code",
        "url": "https://t.me/{}",
        "urlMain": "https://t.me/",
        "username_claimed": "telegram"
    },
    "WeChat": {
        "errorType": "status_code",
        "url": "https://weixin.qq.com/{}",
        "urlMain": "https://weixin.qq.com/",
        "username_claimed": "wechat"
    },
    "Nextdoor": {
        "errorType": "status_code",
        "url": "https://nextdoor.com/profile/{}",
        "urlMain": "https://nextdoor.com/",
        "username_claimed": "nextdoor"
    },
    "Bluesky": {
        "errorType": "status_code",
        "url": "https://bsky.app/profile/{}",
        "urlMain": "https://bsky.app/",
        "username_claimed": "bluesky"
    },
    "Mastodon": {
        "errorType": "status_code",
        "url": "https://mastodon.social/@{}",
        "urlMain": "https://mastodon.social/",
        "username_claimed": "mastodon"
    },
    "Threads": {
        "errorType": "status_code",
        "url": "https://www.threads.net/@{}",
        "urlMain": "https://www.threads.net/",
        "username_claimed": "threads"
    },
    "BeReal": {
        "errorType": "status_code",
        "url": "https://bereal.com/user/{}",
        "urlMain": "https://bereal.com/",
        "username_claimed": "bereal"
    },
    "Rumble": {
        "errorType": "status_code",
        "url": "https://rumble.com/user/{}",
        "urlMain": "https://rumble.com/",
        "username_claimed": "rumble"
    },
    "Odysee": {
        "errorType": "status_code",
        "url": "https://odysee.com/@{}",
        "urlMain": "https://odysee.com/",
        "username_claimed": "odysee"
    },
    "Kick": {
        "errorType": "status_code",
        "url": "https://kick.com/{}",
        "urlMain": "https://kick.com/",
        "username_claimed": "kick"
    },
    "Twitch": {
        "errorType": "status_code",
        "url": "https://www.twitch.tv/{}",
        "urlMain": "https://www.twitch.tv/",
        "username_claimed": "twitch"
    },
    "YouTube": {
        "errorType": "status_code",
        "url": "https://www.youtube.com/@{}",
        "urlMain": "https://www.youtube.com/",
        "username_claimed": "youtube"
    },
    "Dailymotion": {
        "errorType": "status_code",
        "url": "https://www.dailymotion.com/{}",
        "urlMain": "https://www.dailymotion.com/",
        "username_claimed": "dailymotion"
    },
    "Vimeo": {
        "errorType": "status_code",
        "url": "https://vimeo.com/{}",
        "urlMain": "https://vimeo.com/",
        "username_claimed": "vimeo"
    },
    "Flickr": {
        "errorType": "status_code",
        "url": "https://www.flickr.com/photos/{}",
        "urlMain": "https://www.flickr.com/",
        "username_claimed": "flickr"
    },
    "Imgur": {
        "errorType": "status_code",
        "url": "https://imgur.com/user/{}",
        "urlMain": "https://imgur.com/",
        "username_claimed": "imgur"
    },
    "DeviantArt": {
        "errorType": "status_code",
        "url": "https://www.deviantart.com/{}",
        "urlMain": "https://www.deviantart.com/",
        "username_claimed": "deviantart"
    },
    "ArtStation": {
        "errorType": "status_code",
        "url": "https://www.artstation.com/{}",
        "urlMain": "https://www.artstation.com/",
        "username_claimed": "artstation"
    },
    "Behance": {
        "errorType": "status_code",
        "url": "https://www.behance.net/{}",
        "urlMain": "https://www.behance.net/",
        "username_claimed": "behance"
    },
    "500px": {
        "errorType": "status_code",
        "url": "https://500px.com/{}",
        "urlMain": "https://500px.com/",
        "username_claimed": "500px"
    },
    "Dribbble": {
        "errorType": "status_code",
        "url": "https://dribbble.com/{}",
        "urlMain": "https://dribbble.com/",
        "username_claimed": "dribbble"
    },
    "GitHub": {
        "errorType": "status_code",
        "url": "https://github.com/{}",
        "urlMain": "https://github.com/",
        "username_claimed": "github"
    },
    "GitLab": {
        "errorType": "status_code",
        "url": "https://gitlab.com/{}",
        "urlMain": "https://gitlab.com/",
        "username_claimed": "gitlab"
    },
    "Bitbucket": {
        "errorType": "status_code",
        "url": "https://bitbucket.org/{}",
        "urlMain": "https://bitbucket.org/",
        "username_claimed": "bitbucket"
    },
    "Stack Overflow": {
        "errorType": "status_code",
        "url": "https://stackoverflow.com/users/{}",
        "urlMain": "https://stackoverflow.com/",
        "username_claimed": "stackoverflow"
    },
    "HackerNews": {
        "errorType": "status_code",
        "url": "https://news.ycombinator.com/user?id={}",
        "urlMain": "https://news.ycombinator.com/",
        "username_claimed": "hackernews"
    },
    "ProductHunt": {
        "errorType": "status_code",
        "url": "https://www.producthunt.com/@{}",
        "urlMain": "https://www.producthunt.com/",
        "username_claimed": "producthunt"
    },
    "AngelList": {
        "errorType": "status_code",
        "url": "https://angel.co/{}",
        "urlMain": "https://angel.co/",
        "username_claimed": "angellist"
    },
    "Crunchbase": {
        "errorType": "status_code",
        "url": "https://www.crunchbase.com/person/{}",
        "urlMain": "https://www.crunchbase.com/",
        "username_claimed": "crunchbase"
    },
    "Keybase": {
        "errorType": "status_code",
        "url": "https://keybase.io/{}",
        "urlMain": "https://keybase.io/",
        "username_claimed": "keybase"
    },
    "Gravatar": {
        "errorType": "status_code",
        "url": "https://gravatar.com/{}",
        "urlMain": "https://gravatar.com/",
        "username_claimed": "gravatar"
    },
    "Skype": {
        "errorType": "status_code",
        "url": "https://web.skype.com/{}",
        "urlMain": "https://www.skype.com/",
        "username_claimed": "skype"
    },
    "Slack": {
        "errorType": "status_code",
        "url": "https://slack.com/{}",
        "urlMain": "https://slack.com/",
        "username_claimed": "slack"
    },
    "Meetup": {
        "errorType": "status_code",
        "url": "https://www.meetup.com/members/{}",
        "urlMain": "https://www.meetup.com/",
        "username_claimed": "meetup"
    },
    "Eventbrite": {
        "errorType": "status_code",
        "url": "https://www.eventbrite.com/o/{}",
        "urlMain": "https://www.eventbrite.com/",
        "username_claimed": "eventbrite"
    },
    "Foursquare": {
        "errorType": "status_code",
        "url": "https://foursquare.com/{}",
        "urlMain": "https://foursquare.com/",
        "username_claimed": "foursquare"
    },
    "Yelp": {
        "errorType": "status_code",
        "url": "https://www.yelp.com/user_details?userid={}",
        "urlMain": "https://www.yelp.com/",
        "username_claimed": "yelp"
    },
    "TripAdvisor": {
        "errorType": "status_code",
        "url": "https://www.tripadvisor.com/members/{}",
        "urlMain": "https://www.tripadvisor.com/",
        "username_claimed": "tripadvisor"
    },
    "Airbnb": {
        "errorType": "status_code",
        "url": "https://www.airbnb.com/users/show/{}",
        "urlMain": "https://www.airbnb.com/",
        "username_claimed": "airbnb"
    },
    "Booking.com": {
        "errorType": "status_code",
        "url": "https://www.booking.com/user/{}",
        "urlMain": "https://www.booking.com/",
        "username_claimed": "booking"
    },
    "Amazon": {
        "errorType": "status_code",
        "url": "https://www.amazon.com/gp/profile/{}",
        "urlMain": "https://www.amazon.com/",
        "username_claimed": "amazon"
    },
    "eBay": {
        "errorType": "status_code",
        "url": "https://www.ebay.com/usr/{}",
        "urlMain": "https://www.ebay.com/",
        "username_claimed": "ebay"
    },
    "Aliexpress": {
        "errorType": "status_code",
        "url": "https://www.aliexpress.com/store/{}",
        "urlMain": "https://www.aliexpress.com/",
        "username_claimed": "aliexpress"
    },
    "Etsy": {
        "errorType": "status_code",
        "url": "https://www.etsy.com/shop/{}",
        "urlMain": "https://www.etsy.com/",
        "username_claimed": "etsy"
    },
    "Fiverr": {
        "errorType": "status_code",
        "url": "https://www.fiverr.com/{}",
        "urlMain": "https://www.fiverr.com/",
        "username_claimed": "fiverr"
    },
    "Upwork": {
        "errorType": "status_code",
        "url": "https://www.upwork.com/freelancers/~{}",
        "urlMain": "https://www.upwork.com/",
        "username_claimed": "upwork"
    },
    "Freelancer": {
        "errorType": "status_code",
        "url": "https://www.freelancer.com/u/{}",
        "urlMain": "https://www.freelancer.com/",
        "username_claimed": "freelancer"
    },
    "PeoplePerHour": {
        "errorType": "status_code",
        "url": "https://www.peopleperhour.com/freelancer/{}",
        "urlMain": "https://www.peopleperhour.com/",
        "username_claimed": "peopleperhour"
    },
    "Guru": {
        "errorType": "status_code",
        "url": "https://www.guru.com/d/{}",
        "urlMain": "https://www.guru.com/",
        "username_claimed": "guru"
    },
    "Toptal": {
        "errorType": "status_code",
        "url": "https://www.toptal.com/{}",
        "urlMain": "https://www.toptal.com/",
        "username_claimed": "toptal"
    },
    "Behance": {
        "errorType": "status_code",
        "url": "https://www.behance.net/{}",
        "urlMain": "https://www.behance.net/",
        "username_claimed": "behance"
    },
    "Shutterstock": {
        "errorType": "status_code",
        "url": "https://www.shutterstock.com/g/{}",
        "urlMain": "https://www.shutterstock.com/",
        "username_claimed": "shutterstock"
    },
    "iStock": {
        "errorType": "status_code",
        "url": "https://www.istockphoto.com/portfolio/{}",
        "urlMain": "https://www.istockphoto.com/",
        "username_claimed": "istock"
    },
    "Getty Images": {
        "errorType": "status_code",
        "url": "https://www.gettyimages.com/photos/{}",
        "urlMain": "https://www.gettyimages.com/",
        "username_claimed": "gettyimages"
    },
    "Unsplash": {
        "errorType": "status_code",
        "url": "https://unsplash.com/@{}",
        "urlMain": "https://unsplash.com/",
        "username_claimed": "unsplash"
    },
    "Pexels": {
        "errorType": "status_code",
        "url": "https://www.pexels.com/@{}",
        "urlMain": "https://www.pexels.com/",
        "username_claimed": "pexels"
    },
    "Pixabay": {
        "errorType": "status_code",
        "url": "https://pixabay.com/users/{}",
        "urlMain": "https://pixabay.com/",
        "username_claimed": "pixabay"
    },
}

# Ajouter les nouveaux réseaux sociaux au dictionnaire existant
added_count = 0
existing_count = 0

for site_name, site_data in new_social_networks.items():
    if site_name not in data:
        data[site_name] = site_data
        added_count += 1
        print(f"✓ Ajouté : {site_name}")
    else:
        existing_count += 1
        print(f"⚠ Existe déjà : {site_name}")

# Sauvegarder le fichier mis à jour
with open('client/public/sherlock-data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

# Compter les sites finaux
final_count = len([k for k in data.keys() if k != '$schema'])
print(f"\n✓ Total final : {final_count} sites")
print(f"✓ Nouveaux sites ajoutés : {added_count}")
print(f"⚠ Sites existants : {existing_count}")
