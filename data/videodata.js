// videodata.js - Video Collection Data

const videoCollection = [
    {
        id: 1,
        title: "Midnight Secrets: The Awakening",
        code: "MS-2024-001",
        thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format&fit=crop",
        poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format&fit=crop",
        rating: 4.7,
        studio: "Stellar Productions",
        label: "Premium Series",
        release: "2024-03-15",
        duration: "128",
        versions: ["Censored", "Uncensored"],
        series: "Midnight Secrets",
        actresses: ["Sakura", "Miyuki", "Riko"],
        tags: ["Drama", "Romance", "Suspense", "Mystery"],
        category: "Japanese",
        quality: "1080p",
        description: "A captivating story of forbidden love and hidden truths in modern Tokyo. Follow the journey of a young woman who discovers dark secrets about her family's past while navigating complex relationships in the bustling city.",
        featured: true,
        collab: false,
        links: {
            trailer: "https://sample.com/trailer1.mp4",
            censored: "https://sample.com/censored1.mp4"
        },
        previews: [
            "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=800&auto=format&fit=crop"
        ]
    },
    {
        id: 2,
        title: "Tokyo Nights: Neon Dreams",
        code: "TN-2024-002",
        thumbnail: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&auto=format&fit=crop",
        poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&auto=format&fit=crop",
        rating: 4.5,
        studio: "Stellar Productions",
        label: "Urban Series",
        release: "2024-02-28",
        duration: "115",
        versions: ["Censored", "Uncensored", "Subbed"],
        series: "Tokyo Nights",
        actresses: ["Sakura", "Hana"],
        tags: ["Action", "Urban", "Drama", "Modern"],
        category: "Japanese",
        quality: "1080p",
        description: "A thrilling adventure through Tokyo's nightlife. Experience the vibrant energy of the city after dark as characters navigate love, danger, and self-discovery.",
        featured: true,
        collab: false,
        links: {
            trailer: "https://sample.com/trailer2.mp4",
            uncensored: "https://sample.com/uncensored2.mp4"
        },
        previews: [
            "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&auto=format&fit=crop"
        ]
    },
    {
        id: 3,
        title: "Spring Blossoms: Sakura Romance",
        code: "SB-2024-003",
        thumbnail: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&auto=format&fit=crop",
        poster: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&auto=format&fit=crop",
        rating: 4.8,
        studio: "Blossom Studios",
        label: "Romance Series",
        release: "2024-03-20",
        duration: "135",
        versions: ["Censored", "Uncensored"],
        series: "Spring Blossoms",
        actresses: ["Miyuki", "Yui"],
        tags: ["Romance", "Drama", "Spring", "Love"],
        category: "Japanese",
        quality: "4K",
        description: "A beautiful love story set during cherry blossom season. Two strangers meet under the sakura trees and their lives become intertwined in unexpected ways.",
        featured: false,
        collab: true,
        links: {
            trailer: "https://sample.com/trailer3.mp4",
            censored: "https://sample.com/censored3.mp4"
        }
    },
    {
        id: 4,
        title: "Summer Heat: Beach Paradise",
        code: "SH-2024-004",
        thumbnail: "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?w=400&auto=format&fit=crop",
        poster: "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?w=400&auto=format&fit=crop",
        rating: 4.3,
        studio: "Ocean Studios",
        label: "Summer Series",
        release: "2024-06-15",
        duration: "105",
        versions: ["Censored", "Uncensored"],
        series: "Summer Heat",
        actresses: ["Riko", "Hana", "Yui"],
        tags: ["Summer", "Beach", "Romance", "Comedy"],
        category: "Japanese",
        quality: "720p",
        description: "Fun in the sun! A group of friends spend their summer vacation at a tropical beach resort, leading to unexpected romances and hilarious situations.",
        featured: true,
        collab: false,
        links: {
            trailer: "https://sample.com/trailer4.mp4"
        },
        previews: [
            "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?w=800&auto=format&fit=crop"
        ]
    },
    {
        id: 5,
        title: "Winter Romance: Snowflake Kiss",
        code: "WR-2024-005",
        thumbnail: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=400&auto=format&fit=crop",
        poster: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=400&auto=format&fit=crop",
        rating: 4.6,
        studio: "Crystal Studios",
        label: "Winter Series",
        release: "2024-01-10",
        duration: "142",
        versions: ["Censored", "Uncensored", "Subbed"],
        series: "Winter Romance",
        actresses: ["Miyuki", "Sakura"],
        tags: ["Winter", "Romance", "Drama", "Holiday"],
        category: "Japanese",
        quality: "1080p",
        description: "A heartwarming winter romance that blossoms in a small mountain town during the holiday season.",
        featured: false,
        collab: false,
        links: {
            trailer: "https://sample.com/trailer5.mp4"
        }
    }
];

// Additional videos for filtering
for (let i = 6; i <= 20; i++) {
    const studios = ["Stellar Productions", "Blossom Studios", "Ocean Studios", "Crystal Studios", "Tokyo Films"];
    const labels = ["Premium Series", "Urban Series", "Romance Series", "Summer Series", "Winter Series", "Classic Collection"];
    const actresses = ["Sakura", "Miyuki", "Riko", "Hana", "Yui", "Aiko", "Momo", "Nana"];
    const tags = ["Drama", "Romance", "Action", "Comedy", "Mystery", "Urban", "Seasonal", "Modern"];
    const categories = ["Japanese", "Western", "Chinese", "Korean"];
    const versions = [["Censored"], ["Uncensored"], ["Censored", "Uncensored"], ["Subbed"]];
    const qualities = ["1080p", "720p", "4K"];
    
    videoCollection.push({
        id: i,
        title: `Sample Video ${i}: The Experience`,
        code: `SV-2024-${i.toString().padStart(3, '0')}`,
        thumbnail: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&${i}`,
        poster: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&${i}`,
        rating: (3.5 + Math.random() * 1.5).toFixed(1),
        studio: studios[Math.floor(Math.random() * studios.length)],
        label: labels[Math.floor(Math.random() * labels.length)],
        release: `2024-${(Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0')}-${(Math.floor(Math.random() * 28) + 1).toString().padStart(2, '0')}`,
        duration: (60 + Math.floor(Math.random() * 90)).toString(),
        versions: versions[Math.floor(Math.random() * versions.length)],
        series: `Series ${String.fromCharCode(65 + Math.floor(Math.random() * 5))}`,
        actresses: Array.from({length: Math.floor(Math.random() * 3) + 1}, () => 
            actresses[Math.floor(Math.random() * actresses.length)]
        ).filter((v, i, a) => a.indexOf(v) === i),
        tags: Array.from({length: Math.floor(Math.random() * 4) + 1}, () => 
            tags[Math.floor(Math.random() * tags.length)]
        ).filter((v, i, a) => a.indexOf(v) === i),
        category: categories[Math.floor(Math.random() * categories.length)],
        quality: qualities[Math.floor(Math.random() * qualities.length)],
        description: `This is a sample description for video ${i}. It provides details about the plot, characters, and themes explored in this production.`,
        featured: Math.random() > 0.7,
        collab: Math.random() > 0.5,
        links: {
            trailer: `https://sample.com/trailer${i}.mp4`
        }
    });
}

console.log(`Loaded ${videoCollection.length} videos`);
