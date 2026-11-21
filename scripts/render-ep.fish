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

function render_one --argument-names composition output slug
    echo "Rendering $composition -> $output"
    npx remotion render src/index.ts $composition $output --props="content/episodes/$slug.json"
    or exit 1
end

switch $format
    case vertical
        render_one VerticalReels "out/$slug-vertical.mp4" $slug
    case landscape
        render_one LandscapeVideo "out/$slug-landscape.mp4" $slug
    case both
        render_one VerticalReels "out/$slug-vertical.mp4" $slug
        render_one LandscapeVideo "out/$slug-landscape.mp4" $slug
    case '*'
        echo $usage
        exit 1
end
