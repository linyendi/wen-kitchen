package com.wen;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@SpringBootApplication
@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "*")
public class Application {

    private static List<Map<String, Object>> menu = new ArrayList<>(List.of(
        new HashMap<>(Map.of("category", "雞蛋燒", "items", new ArrayList<>(List.of(
            new HashMap<>(Map.of("name", "肉鬆起司蛋", "price", 45, "note", "人氣")),
            new HashMap<>(Map.of("name", "只有肉鬆蛋", "price", 40, "note", ""))
        )))),
        new HashMap<>(Map.of("category", "雞蛋糕", "items", new ArrayList<>(List.of(
            new HashMap<>(Map.of("name", "古早味雞蛋糕", "price", 20, "note", "經典")),
            new HashMap<>(Map.of("name", "香濃奶酥", "price", 35, "note", "限量"))
        ))))
    ));

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @GetMapping
    public List<Map<String, Object>> getMenu() { return menu; }
}
