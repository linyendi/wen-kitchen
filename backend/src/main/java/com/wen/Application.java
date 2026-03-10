package com.wen;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@SpringBootApplication
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // 允許前端跨域讀取資料
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @GetMapping("/menu")
    public List<Map<String, Object>> getMenu() {
        // 定義預設的品項資料
        List<Map<String, Object>> menu = new ArrayList<>();

        // 雞蛋燒類別
        Map<String, Object> group1 = new HashMap<>();
        group1.put("category", "雞蛋燒");
        group1.put("items", List.of(
            Map.of("name", "肉鬆起司蛋", "price", 45, "note", "人氣推薦"),
            Map.of("name", "只有肉鬆蛋", "price", 40, "note", "")
        ));

        // 雞蛋糕類別
        Map<String, Object> group2 = new HashMap<>();
        group2.put("category", "雞蛋糕");
        group2.put("items", List.of(
            Map.of("name", "古早味雞蛋糕", "price", 20, "note", "經典"),
            Map.of("name", "香濃奶酥", "price", 35, "note", "限量")
        ));

        menu.add(group1);
        menu.add(group2);
        return menu;
    }
}
