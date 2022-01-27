use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{near_bindgen, PanicOnDefault};
use serde::Serialize;

near_sdk::setup_alloc!();

const GRID_SIZE: usize = 50;
const CELL_SIZE: usize = 12;
const DEFAULT_CELL_COLOR: u32 = 16777215; // #FFFFFF

#[derive(BorshDeserialize, BorshSerialize, Serialize, Copy, Clone)]
struct Pixel {
    x_coord: u32,
    y_coord: u32,
    color: u32,
}

impl Pixel {
    fn new() -> Self {
        Pixel {
            x_coord: 0,
            y_coord: 0,
            color: DEFAULT_CELL_COLOR,
        }
    }
}

#[near_bindgen]
#[derive(PanicOnDefault, BorshDeserialize, BorshSerialize)]
struct Grid {
    pixels: Vec<Vec<Pixel>>,
}

#[near_bindgen]
impl Grid {
    #[init]
    pub fn new() -> Self {
        let mut pixels = vec![vec![Pixel::new(); GRID_SIZE]; GRID_SIZE];

        for i in 0..GRID_SIZE {
            for j in 0..GRID_SIZE {
                pixels[i][j] = Pixel {
                    x_coord: (i * CELL_SIZE) as u32,
                    y_coord: (j * CELL_SIZE) as u32,
                    color: DEFAULT_CELL_COLOR,
                }
            }
        }

        Self { pixels }
    }

    pub fn get_pixels(self) -> Vec<Vec<Pixel>> {
        self.pixels
    }

    pub fn update_pixel(&mut self, x_coord: u32, y_coord: u32, new_color: u32) {
        self.pixels[x_coord as usize][y_coord as usize].color = new_color;
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    // impl this
}
