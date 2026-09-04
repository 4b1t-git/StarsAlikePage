"""Generate transparent masks for the theme-colored pixels in real app captures."""

from __future__ import annotations

import colorsys
from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
MOCKUPS = ROOT / "public" / "mockups"
SOURCE_HUE = colorsys.rgb_to_hsv(179 / 255, 146 / 255, 230 / 255)[0]


def hue_distance(first: float, second: float) -> float:
    distance = abs(first - second)
    return min(distance, 1 - distance)


def accent_alpha(red: int, green: int, blue: int) -> int:
    hue, saturation, value = colorsys.rgb_to_hsv(
        red / 255,
        green / 255,
        blue / 255,
    )
    distance = hue_distance(hue, SOURCE_HUE)
    hue_score = max(0.0, 1.0 - distance / (30 / 360))
    saturation_score = max(0.0, min(1.0, (saturation - 0.18) / 0.16))
    value_score = max(0.0, min(1.0, (value - 0.14) / 0.28))
    return round(255 * hue_score * saturation_score * value_score)


def clear_card_interiors(mask: Image.Image, cards: list[tuple[float, float, float, float]]) -> None:
    draw = ImageDraw.Draw(mask)
    width, height = mask.size
    for left, top, card_width, card_height in cards:
        x0 = round(left * width) + 4
        y0 = round(top * height) + 4
        x1 = round((left + card_width) * width) - 4
        y1 = round((top + card_height) * height) - 4
        draw.rounded_rectangle((x0, y0, x1, y1), radius=max(1, round(width * 0.006)), fill=0)


def generate(
    source_name: str,
    output_name: str,
    cards: list[tuple[float, float, float, float]],
    avatar_exclusions: list[tuple[float, float, float]],
    rectangle_exclusions: list[tuple[float, float, float, float]],
    dark_text_regions: list[tuple[float, float, float, float]],
) -> None:
    source = Image.open(MOCKUPS / source_name).convert("RGB")
    mask = Image.new("L", source.size)
    mask.putdata([accent_alpha(*pixel) for pixel in source.get_flattened_data()])

    clear_card_interiors(mask, cards)
    draw = ImageDraw.Draw(mask)
    width, height = source.size
    for center_x, center_y, radius in avatar_exclusions:
        x = center_x * width
        y = center_y * height
        r = radius * width
        draw.ellipse((x - r, y - r, x + r, y + r), fill=0)
    for left, top, right, bottom in rectangle_exclusions:
        draw.rectangle(
            (left * width, top * height, right * width, bottom * height),
            fill=0,
        )
    pixels = source.load()
    mask_pixels = mask.load()
    for left, top, right, bottom in dark_text_regions:
        for y in range(round(top * height), round(bottom * height)):
            for x in range(round(left * width), round(right * width)):
                if max(pixels[x, y]) < 184:
                    mask_pixels[x, y] = 0

    rgba = Image.new("RGBA", source.size, (255, 255, 255, 0))
    rgba.putalpha(mask)
    rgba.save(MOCKUPS / output_name, optimize=True)
    print(
        f"{output_name}: {mask.getbbox()=}, "
        f"{sum(value > 0 for value in mask.get_flattened_data())} pixels"
    )


generate(
    "phone-inicio-real.webp",
    "phone-inicio-accent-mask.png",
    cards=[
        (0.067, 0.4065, 0.442, 0.314),
        (0.55, 0.4065, 0.442, 0.314),
    ],
    avatar_exclusions=[(0.105, 0.948, 0.055)],
    rectangle_exclusions=[(0.05, 0.155, 0.95, 0.225)],
    dark_text_regions=[],
)

generate(
    "tablet-inicio-real.webp",
    "tablet-inicio-accent-mask.png",
    cards=[
        (0.05464, 0.24527, 0.12143, 0.29508),
        (0.18821, 0.24527, 0.12143, 0.29508),
        (0.32179, 0.24527, 0.12143, 0.29508),
        (0.45536, 0.24527, 0.12143, 0.29508),
        (0.58893, 0.24527, 0.12143, 0.29508),
        (0.7225, 0.24527, 0.12143, 0.29508),
        (0.85607, 0.24527, 0.12143, 0.29508),
    ],
    avatar_exclusions=[(0.0245, 0.055, 0.014)],
    rectangle_exclusions=[(0.075, 0.135, 0.45, 0.19)],
    dark_text_regions=[
        (0.65, 0.795, 0.9, 0.915),
        (0.91, 0.81, 0.96, 0.9),
    ],
)
