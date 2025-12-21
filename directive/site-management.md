# Site management

This component is responsible for managing sites. This means adding a new site using a form, having an overview of all sites and being
to drill down on an existing site to see the details and potentially change them. 

The Site management component will be divided in 3 panes: 
The left pane is will contain the form. This pane takes up 45% of the screen. 
The mid pane will contain just a list of all existing sites and will take up 20% of the screen.
The right pane will contain the site details which will only be filled up if a site is selected. 

## Models
A site looks like this in java: 

```java

    private Long id;
    private String name;
    private Customer customer;
    private LocalDate desiredDate;
    private LocalDate executionDate;
    private Integer durationInDays;
    private String transport;
    private Instant creationDate;
    private SiteStatus status;
    private List<Worker> workers;
```

A customer: 
```java
    private Long id;
    private String name;
    private Boolean isPrivate;
```
A worker: 

```java
    private Long id;
    private String firstName;
    private String lastName;
```
## Adding a site

Adding a site is done by a form. The form represents a request which on submit by a button is to be sent to the following url: 
POST `http://localhost:8080/site`. 

The request looks as following: 

```java
public record CreateSiteRequest(
  @JsonProperty("name")
  @NotBlank(message = "Name is mandatory")
  String name,

  @JsonProperty("customer_name")
  @NotBlank(message = "Customer name is mandatory")
  String customerName,

  @JsonProperty("is_private_customer")
  Boolean isPrivateCustomer,

  @JsonProperty("desired_date")
  LocalDate desiredDate,

  @JsonProperty("duration_in_days")
  Integer durationInDays,

  @JsonProperty("transport")
  String transport
) {}
```
When the button 'create' is pressed, the request is sent to the backend. When returned a 201 - created, we perform another request
to get all sites with status open. this request doesn't exist yet, so we can comment it for now. 


