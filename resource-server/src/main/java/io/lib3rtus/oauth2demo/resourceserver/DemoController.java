package io.lib3rtus.oauth2demo.resourceserver;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/items", produces = MediaType.APPLICATION_JSON_VALUE)
public class DemoController {

    @GetMapping
    public List<?> items() {
        return List.of(Map.of("itemId", 1), Map.of("itemId", 2), Map.of("itemId", 3));
    }

    @GetMapping("/{id}")
    public Map<?, ?> item(@PathVariable Integer id) {
        return Map.of("itemId", id);
    }

}
