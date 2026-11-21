#!/usr/bin/env fish

set -l usage "Usage: scripts/render-ep.fish <slug> [vertical|landscape|both]"

if not set -q argv[1]
    echo $usage
    exit 1
end

set -l slug $argv[1]
set -l format vertical

if set -q argv[2]
    set format $argv[2]
end

set -l episode "content/episodes/$slug.json"

if not test -f $episode
    echo "Episode not found: $episode"
    exit 1
end

mkdir -p out

function render_one --argument-names composition output episode
    echo "Rendering $composition -> $output"
    echo "Props: $episode"
    npx remotion render src/index.ts $composition $output --props="$episode"
    or exit 1
end

function render_thumb --argument-names composition output episode
    echo "Thumbnail $composition -> $output"
    npx remotion still src/index.ts $composition $output --frame=0 --props="$episode"
    or exit 1
end

switch $format
    case vertical
        render_one VerticalReels "out/$slug-vertical.mp4" $episode
        render_thumb VerticalReels "out/$slug-thumb.png" $episode
    case landscape
        render_one LandscapeVideo "out/$slug-landscape.mp4" $episode
        render_thumb LandscapeVideo "out/$slug-thumb.png" $episode
    case both
        render_one VerticalReels "out/$slug-vertical.mp4" $episode
        render_one LandscapeVideo "out/$slug-landscape.mp4" $episode
        render_thumb VerticalReels "out/$slug-thumb.png" $episode
    case '*'
        echo $usage
        exit 1
end
