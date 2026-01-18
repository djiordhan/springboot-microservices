package com.example.userservice.soap;

import com.example.common.dto.UserDTO;
import com.example.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import javax.xml.parsers.DocumentBuilderFactory;

/**
 * SOAP Endpoint implementation.
 * Note: In a production environment, you would use JAXB generated classes.
 * Here we use a manual response builder to keep the sample simple and runnable.
 */
@Endpoint
public class UserEndpoint {
    private static final String NAMESPACE_URI = "http://example.com/userservice/soap";

    @Autowired
    private UserService userService;

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "getUserRequest")
    @ResponsePayload
    public Element getUser(@RequestPayload Element request) throws Exception {
        String idStr = request.getElementsByTagNameNS(NAMESPACE_URI, "id").item(0).getTextContent();
        Long id = Long.parseLong(idStr);
        
        UserDTO userDTO = userService.getUserById(id);

        Document document = DocumentBuilderFactory.newInstance().newDocumentBuilder().newDocument();
        Element response = document.createElementNS(NAMESPACE_URI, "getUserResponse");
        Element user = document.createElementNS(NAMESPACE_URI, "user");
        
        Element idEl = document.createElementNS(NAMESPACE_URI, "id");
        idEl.setTextContent(userDTO.getId().toString());
        
        Element usernameEl = document.createElementNS(NAMESPACE_URI, "username");
        usernameEl.setTextContent(userDTO.getUsername());
        
        Element emailEl = document.createElementNS(NAMESPACE_URI, "email");
        emailEl.setTextContent(userDTO.getEmail());
        
        Element fullNameEl = document.createElementNS(NAMESPACE_URI, "fullName");
        fullNameEl.setTextContent(userDTO.getFullName());

        user.appendChild(idEl);
        user.appendChild(usernameEl);
        user.appendChild(emailEl);
        user.appendChild(fullNameEl);
        response.appendChild(user);
        
        return response;
    }
}
